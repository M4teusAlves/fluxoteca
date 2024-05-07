package br.com.fluxoteca.backend.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
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

import br.com.fluxoteca.backend.dto.Autor.AtualizacaoAutorDto;
import br.com.fluxoteca.backend.dto.Autor.AutorResponseDto;
import br.com.fluxoteca.backend.dto.Autor.CriacaoAutorDto;
import br.com.fluxoteca.backend.model.Autor;
import br.com.fluxoteca.backend.repository.AutorRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/autores")
public class AutorController {
    
    @Autowired
    private AutorRepository autorRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<AutorResponseDto> criar(@RequestBody @Valid CriacaoAutorDto data, UriComponentsBuilder uriBuilder){
        Autor autor = new Autor();
        BeanUtils.copyProperties(data, autor);

        autorRepository.save(autor);

        var uri = uriBuilder.path("Autors/{id}").buildAndExpand(autor.getId()).toUri();

        return ResponseEntity.created(uri).body(new AutorResponseDto(autor));
    }

    @GetMapping
    public ResponseEntity<List<AutorResponseDto>> listar(){

        var AutorsList = autorRepository.findAll().stream().map(AutorResponseDto::new).toList();

        return ResponseEntity.ok(AutorsList);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<AutorResponseDto> atualizar(@RequestBody @Valid AtualizacaoAutorDto data){
        var autor = autorRepository.getReferenceById(data.id());
        autor.atualizarInformacao(data);

        return ResponseEntity.ok(new AutorResponseDto(autor));

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var autor = autorRepository.getReferenceById(id);
        autor.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public void reativar(@PathVariable Long id){
        var Autor = autorRepository.getReferenceById(id);
        Autor.ativar();
    }

}
