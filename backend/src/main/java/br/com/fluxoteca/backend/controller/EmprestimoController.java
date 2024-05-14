package br.com.fluxoteca.backend.controller;

import java.time.LocalDate;
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

import br.com.fluxoteca.backend.dto.Emprestimo.AtualizacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Emprestimo.CriacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Emprestimo.EmprestimoResponseDto;
import br.com.fluxoteca.backend.model.Emprestimo;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.LeitorRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/emprestimos")
@Tag(name="Empréstimos")
public class EmprestimoController {
    
    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private LeitorRepository leitorRepository;


    @PostMapping
    @Transactional
    @Operation(summary = "Cria um empréstimo")
    public ResponseEntity<EmprestimoResponseDto> criar(@RequestBody @Valid CriacaoEmprestimoDto data, UriComponentsBuilder uriBuilder){
        Emprestimo emprestimo = new Emprestimo();

        if(!livroRepository.existsById(data.livro()) || !leitorRepository.existsById(data.leitor()))
            return ResponseEntity.notFound().build();

        if(data.dataDevolucao().isBefore(LocalDate.now()))
            return ResponseEntity.badRequest().build();

        var livro = livroRepository.getReferenceById(data.livro());
        var leitor = leitorRepository.getReferenceById(data.leitor());

        emprestimo.setLivro(livro);

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

    @PutMapping
    @Transactional
    @Operation(summary = "Atualiza um empréstimo")
    public ResponseEntity<EmprestimoResponseDto> atualizar(@RequestBody @Valid AtualizacaoEmprestimoDto data){
        var emprestimo = emprestimoRepository.getReferenceById(data.id());
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
    public void reativar(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.ativar();
    }

    @PutMapping("/validar")
    @Transactional
    @Operation(summary = "Valida o empréstimo com base na data de devolução")
    public ResponseEntity<Void> validaemprestimos (){
        emprestimoRepository.findByStatus(true).stream().forEach((emprestimo) -> { emprestimo.atualizarEstado(); });
        return ResponseEntity.ok().build();
    }

}
