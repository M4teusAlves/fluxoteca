package br.com.fluxoteca.backend.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.fluxoteca.backend.dto.Livro.CriacaoLivroDto;
import br.com.fluxoteca.backend.model.Livro;
import br.com.fluxoteca.backend.repository.AutorRepository;
import br.com.fluxoteca.backend.repository.CategoriaRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
    public ResponseEntity<Livro> criar(@RequestBody @Valid CriacaoLivroDto data, UriComponentsBuilder uriBuilder){
        Livro livro = new Livro();

        livro.setNome(data.nome());
        
        livroRepository.save(livro);

        var uri = uriBuilder.path("livros/{id}").buildAndExpand(livro.getId()).toUri();

        return ResponseEntity.created(uri).body(livro);
    }

    @GetMapping
    public ResponseEntity<List<Livro>> listar(){

        var livrosList = livroRepository.findAll();

        return ResponseEntity.ok(livrosList);
    }

}
