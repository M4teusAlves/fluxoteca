package br.com.fluxoteca.backend.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
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

import br.com.fluxoteca.backend.dto.Autor.AtualizacaoAutorDto;
import br.com.fluxoteca.backend.dto.Autor.AutorResponseDto;
import br.com.fluxoteca.backend.dto.Autor.CriacaoAutorDto;
import br.com.fluxoteca.backend.model.Autor;
import br.com.fluxoteca.backend.repository.AutorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/autores")
@CrossOrigin(origins = "*")
@Tag(name="Autores")
public class AutorController {
    
    @Autowired
    private AutorRepository autorRepository;

    @PostMapping
    @Transactional
    @Operation(summary = "Cria um autor")
    public ResponseEntity<AutorResponseDto> criar(@RequestBody @Valid CriacaoAutorDto data, UriComponentsBuilder uriBuilder){
        Autor autor = new Autor();


        if(autorRepository.existsByNome(data.nome()))
            return ResponseEntity.badRequest().build();

        BeanUtils.copyProperties(data, autor);

        autorRepository.save(autor);

        var uri = uriBuilder.path("autores/{id}").buildAndExpand(autor.getId()).toUri();

        return ResponseEntity.created(uri).body(new AutorResponseDto(autor));
    }

    @GetMapping
    @Operation(summary = "Lista todos os autores")
    public ResponseEntity<List<AutorResponseDto>> listar(){

        var AutorsList = autorRepository.findAll().stream().map(AutorResponseDto::new).toList();

        return ResponseEntity.ok(AutorsList);
    }

    @GetMapping("/{id}")
    @Transactional
    @Operation(summary = "Busca um autor por id")
    public ResponseEntity<AutorResponseDto> buscaPorId(@PathVariable Long id) {

        Autor autor = autorRepository.getReferenceById(id);


        return  ResponseEntity.ok(new AutorResponseDto(autor));

    }

    @GetMapping("status/{status}")
    @Operation(summary = "Lista autores por status")
    public ResponseEntity<List<AutorResponseDto>> buscaPorStatus(@RequestParam boolean param) {

        var AutorsList = autorRepository.findByStatus(param).stream().map(AutorResponseDto::new).toList();

        return ResponseEntity.ok(AutorsList);
    }
    
    

    @PutMapping
    @Transactional
    @Operation(summary = "Atualiza um autor")
    public ResponseEntity<AutorResponseDto> atualizar(@RequestBody @Valid AtualizacaoAutorDto data){
        var autor = autorRepository.getReferenceById(data.id());
        autor.atualizarInformacao(data);

        return ResponseEntity.ok(new AutorResponseDto(autor));

    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Deleta um autor")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var autor = autorRepository.getReferenceById(id);
        autor.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "Reativa um autor")
    public ResponseEntity<Void> reativar(@PathVariable Long id){
        var Autor = autorRepository.getReferenceById(id);
        Autor.ativar();

        return ResponseEntity.noContent().build();
    }

}
