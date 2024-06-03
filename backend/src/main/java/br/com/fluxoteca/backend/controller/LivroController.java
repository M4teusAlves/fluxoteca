package br.com.fluxoteca.backend.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.fluxoteca.backend.dto.Livro.AtualizacaoLivroDto;
import br.com.fluxoteca.backend.dto.Livro.CriacaoLivroDto;
import br.com.fluxoteca.backend.dto.Livro.LivroResponseDto;
import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.model.Livro;
import br.com.fluxoteca.backend.repository.AutorRepository;
import br.com.fluxoteca.backend.repository.CategoriaRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/livros")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name="Livros")
public class LivroController {
    
    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostMapping
    @Transactional
    @Operation(summary = "Cria um livro")
    public ResponseEntity<LivroResponseDto> criar(@RequestBody @Valid CriacaoLivroDto data, UriComponentsBuilder uriBuilder){
        Livro livro = new Livro();

        if(!autorRepository.existsById(data.autor()) || !categoriaRepository.existsById(data.categoria()))
            return ResponseEntity.notFound().build();

        var categoria = categoriaRepository.getReferenceById(data.categoria());
        var autor = autorRepository.getReferenceById(data.autor());

        livro.setNome(data.nome());
        
        livro.setAutor(autor);

        livro.setCategoria(categoria);

        livro.setExemplares(new ArrayList<Exemplar>());

        livroRepository.save(livro);

        var uri = uriBuilder.path("livros/{id}").buildAndExpand(livro.getId()).toUri();

        return ResponseEntity.created(uri).body(new LivroResponseDto(livro));
    }

    @GetMapping
    @Operation(summary = "Lista todos os livros")
    public ResponseEntity<List<LivroResponseDto>> listar(){

        var livrosList = livroRepository.findAll().stream().map(LivroResponseDto::new).toList();

        return ResponseEntity.ok(livrosList);
    }

    @GetMapping("/{id}")
    @Transactional
    @Operation(summary = "Busca um Livro por id")
    public ResponseEntity<LivroResponseDto> buscaPorId(@PathVariable Long id) {

        Livro livro = livroRepository.getReferenceById(id);


        return  ResponseEntity.ok(new LivroResponseDto(livro));

    }

    @PutMapping
    @Transactional
    @Operation(summary = "Atualiza um livro")
    public ResponseEntity<LivroResponseDto> atualizar(@RequestBody @Valid AtualizacaoLivroDto data){
        var livro = livroRepository.getReferenceById(data.id());

        if(data.autor() != null){
            if(autorRepository.existsById(data.autor())){
                livro.setAutor(autorRepository.getReferenceById(data.autor()));
                livro.setDataModificacao(LocalDate.now());
            }   
            else
                return ResponseEntity.notFound().build();
        }

        if( data.categoria() != null){
            if(categoriaRepository.existsById(data.categoria())){
                livro.setCategoria(categoriaRepository.getReferenceById(data.categoria()));
                livro.setDataModificacao(LocalDate.now());
            }     
            else
                return ResponseEntity.notFound().build();    
        }

        livro.atualizarInformacao(data);

        return ResponseEntity.ok(new LivroResponseDto(livro));

    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Deleta um livro")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var livro = livroRepository.getReferenceById(id);
        livro.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "Reativa um livro")
    public ResponseEntity<Void> reativar(@PathVariable Long id){
        var livro = livroRepository.getReferenceById(id);
        livro.ativar();

        return ResponseEntity.noContent().build();
    }

}
