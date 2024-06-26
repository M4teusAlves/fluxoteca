package br.com.fluxoteca.backend.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.fluxoteca.backend.dto.Exemplar.AtualizacaoExemplarDto;
import br.com.fluxoteca.backend.dto.Exemplar.ExemplarResponseDto;
import br.com.fluxoteca.backend.dto.Exemplar.CriacaoExemplarDto;
import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.repository.ExemplarRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/exemplares")
@CrossOrigin(origins = "*")
@Tag(name="Exemplares")
public class ExemplarController {

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private LivroRepository livroRepository;

    @PostMapping
    @Transactional
    @Operation(summary = "Cria um Exemplar")
    public ResponseEntity<ExemplarResponseDto> criar(@RequestBody @Valid CriacaoExemplarDto data, UriComponentsBuilder uriBuilder){
        Exemplar exemplar = new Exemplar();
        

        if(!livroRepository.existsById(data.livroId()))
            return ResponseEntity.notFound().build();

        if(exemplarRepository.existsById(data.id()))
            return ResponseEntity.badRequest().build();

        exemplar.setId(data.id());

        exemplar.setLivro(livroRepository.getReferenceById(data.livroId()));

        exemplar.setLocalizacao(data.localizacao());

        exemplarRepository.save(exemplar);

        var uri = uriBuilder.path("exemplares/{id}").buildAndExpand(exemplar.getId()).toUri();

        return ResponseEntity.created(uri).body(new ExemplarResponseDto(exemplar));
    }

    @GetMapping
    @Operation(summary = "Lista todos os Exemplares")
    public ResponseEntity<List<ExemplarResponseDto>> listar(){

        var exemplarsList = exemplarRepository.findAll().stream().map(ExemplarResponseDto::new).toList();

        return ResponseEntity.ok(exemplarsList);
    }

    @GetMapping("/{id}")
    @Transactional
    @Operation(summary = "Busca um Exemplar por id")
    public ResponseEntity<ExemplarResponseDto> buscaPorId(@PathVariable String id) {

        Exemplar exemplar = exemplarRepository.getReferenceById(id);


        return  ResponseEntity.ok(new ExemplarResponseDto(exemplar));

    }

    @GetMapping("status/{status}")
    @Operation(summary = "Lista exemplares por status")
    public ResponseEntity<List<ExemplarResponseDto>> buscaPorStatus(@PathVariable boolean status) {

        var exemplaresList = exemplarRepository.findByStatus(status).stream().map(ExemplarResponseDto::new).toList();

        return ResponseEntity.ok(exemplaresList);
    }

    @GetMapping("livro/{id}")
    @Operation(summary = "Lista exemplares por livro")
    public ResponseEntity<List<ExemplarResponseDto>> buscaPorLivro(@PathVariable Long id) {

        var livro = livroRepository.findById(id);

        if(livro == null)
            ResponseEntity.ok(null);

        var exemplaresList = exemplarRepository.findByLivroActived(livro).stream().map(ExemplarResponseDto::new).toList();

        return ResponseEntity.ok(exemplaresList);
    }
    

    @PutMapping
    @Transactional
    @Operation(summary = "Atualiza um Exemplar")
    public ResponseEntity<ExemplarResponseDto> atualizar(@RequestBody @Valid AtualizacaoExemplarDto data){
        var exemplar = exemplarRepository.getReferenceById(data.id());
        exemplar.atualizarInformacao(data);

        return ResponseEntity.ok(new ExemplarResponseDto(exemplar));

    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Deleta um Exemplar")
    public ResponseEntity<Void> deletar(@PathVariable String id){
        var exemplar = exemplarRepository.getReferenceById(id);
        exemplar.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "Reativa um Exemplar")
    public ResponseEntity<Void> reativar(@PathVariable String id){
        var exemplar = exemplarRepository.getReferenceById(id);
        exemplar.ativar();

        return ResponseEntity.noContent().build();
    }
    
}