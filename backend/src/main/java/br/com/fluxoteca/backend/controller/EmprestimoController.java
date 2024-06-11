package br.com.fluxoteca.backend.controller;

import java.time.LocalDate;
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

import br.com.fluxoteca.backend.dto.Emprestimo.AtualizacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Emprestimo.CriacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Emprestimo.EmprestimoResponseDto;
import br.com.fluxoteca.backend.model.Emprestimo;
import br.com.fluxoteca.backend.model.enums.Estado;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.ExemplarRepository;
import br.com.fluxoteca.backend.repository.LeitorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/emprestimos")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name="Empréstimos")
public class EmprestimoController {
    
    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private LeitorRepository leitorRepository;


    @PostMapping
    @Transactional
    @Operation(summary = "Cria um empréstimo")
    public ResponseEntity<EmprestimoResponseDto> criar(@RequestBody @Valid CriacaoEmprestimoDto data, UriComponentsBuilder uriBuilder){
        Emprestimo emprestimo = new Emprestimo();

        if(!exemplarRepository.existsById(data.exemplar()) || !leitorRepository.existsById(data.leitor()))
            return ResponseEntity.notFound().build();

        var exemplar = exemplarRepository.getReferenceById(data.exemplar());
        var leitor = leitorRepository.getReferenceById(data.leitor());

        exemplar.setEstado(Estado.EMPRESTADO);
        exemplar.setDataModificacao(LocalDate.now());

        emprestimo.setExemplar(exemplar);

        emprestimo.setLeitor(leitor);

        emprestimo.setDataDevolucao(data.dataDevolucao());

        emprestimoRepository.save(emprestimo);

        var uri = uriBuilder.path("emprestimos/{id}").buildAndExpand(emprestimo.getId()).toUri();

        return ResponseEntity.created(uri).body(new EmprestimoResponseDto(emprestimo));
    }

    @GetMapping
    @Operation(summary = "Lista todos os empréstimos")
    public ResponseEntity<List<EmprestimoResponseDto>> listar(){

        var emprestimosList = emprestimoRepository.findAll().stream().map(EmprestimoResponseDto::new).toList();


        return ResponseEntity.ok(emprestimosList);
    }

    @GetMapping("/{id}")
    @Transactional
    @Operation(summary = "Busca um empréstimo por id")
    public ResponseEntity<EmprestimoResponseDto> buscaPorId(@PathVariable Long id) {

        Emprestimo empréstimo = emprestimoRepository.getReferenceById(id);

        return  ResponseEntity.ok(new EmprestimoResponseDto(empréstimo));

    }

    @GetMapping("status/{status}")
    @Operation(summary = "Lista emprestimos por status")
    public ResponseEntity<List<EmprestimoResponseDto>> buscaPorStatus(@RequestParam boolean param) {

        var emprestimosList = emprestimoRepository.findByStatus(param).stream().map(EmprestimoResponseDto::new).toList();

        return ResponseEntity.ok(emprestimosList);
    }

    @PutMapping
    @Transactional
    @Operation(summary = "Atualiza um empréstimo")
    public ResponseEntity<EmprestimoResponseDto> atualizar(@RequestBody @Valid AtualizacaoEmprestimoDto data){
        var emprestimo = emprestimoRepository.getReferenceById(data.id());

        if(data.leitor() !=null){
            if (leitorRepository.existsById(data.leitor())) {
                emprestimo.setLeitor(leitorRepository.getReferenceById(data.leitor()));
                emprestimo.setDataModificacao(LocalDate.now());
            }else
                return ResponseEntity.notFound().build();
        }

        if(data.exemplar() !=null){
            if (exemplarRepository.existsById(data.exemplar())) {
                var exemplar = exemplarRepository.getReferenceById(data.exemplar());
                var exemplarAntigo = exemplarRepository.getReferenceById(emprestimo.getExemplar().getId());
                emprestimo.setExemplar(exemplar);
                emprestimo.setDataModificacao(LocalDate.now());
                exemplarAntigo.setEstado(Estado.DISPONIVEL);
                exemplarAntigo.setDataModificacao(LocalDate.now());
                exemplar.setEstado(Estado.EMPRESTADO);
                exemplar.setDataModificacao(LocalDate.now());

            }else
                return ResponseEntity.notFound().build();
        }

        emprestimo.atualizarInformacao(data);

        return ResponseEntity.ok(new EmprestimoResponseDto(emprestimo));

    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Deleta um empréstimo")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "Reativa um empréstimo")
    public ResponseEntity<Void> reativar(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.ativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/validar")
    @Transactional
    @Operation(summary = "Valida o empréstimo com base na data de devolução")
    public ResponseEntity<Void> validaemprestimos (){
        emprestimoRepository.findByStatus(true).stream().forEach((emprestimo) -> { emprestimo.atualizarEstado(); });
        return ResponseEntity.ok().build();
    }

}
