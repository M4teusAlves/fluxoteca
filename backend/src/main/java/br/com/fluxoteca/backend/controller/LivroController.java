package br.com.fluxoteca.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import br.com.fluxoteca.backend.model.Livro;
import br.com.fluxoteca.backend.repository.AutorRepository;
import br.com.fluxoteca.backend.repository.CategoriaRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/livros")
public class LivroController {
    
    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<LivroResponseDto> criar(@RequestBody @Valid CriacaoLivroDto data, UriComponentsBuilder uriBuilder){
        Livro livro = new Livro();

        if(!autorRepository.existsById(data.autor()) || !livroRepository.existsById(data.categoria()))
            return ResponseEntity.notFound().build();

        var categoria = categoriaRepository.getReferenceById(data.categoria());
        var autor = autorRepository.getReferenceById(data.autor());

        livro.setNome(data.nome());
        
        livro.setAutor(autor);

        livro.setCategoria(categoria);

        livroRepository.save(livro);

        var uri = uriBuilder.path("livros/{id}").buildAndExpand(livro.getId()).toUri();

        return ResponseEntity.created(uri).body(new LivroResponseDto(livro));
    }

    @GetMapping
    public ResponseEntity<List<LivroResponseDto>> listar(){

        var livrosList = livroRepository.findAll().stream().map(LivroResponseDto::new).toList();

        return ResponseEntity.ok(livrosList);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<LivroResponseDto> atualizar(@RequestBody @Valid AtualizacaoLivroDto data){
        var livro = livroRepository.getReferenceById(data.id());
        livro.atualizarInformacao(data);

        return ResponseEntity.ok(new LivroResponseDto(livro));

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var livro = livroRepository.getReferenceById(id);
        livro.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public void reativar(@PathVariable Long id){
        var livro = livroRepository.getReferenceById(id);
        livro.ativar();
    }

}
