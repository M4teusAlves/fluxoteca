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
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {
    
    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private LeitorRepository leitorRepository;


    @PostMapping
    @Transactional
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
    public ResponseEntity<List<EmprestimoResponseDto>> listar(){

        var emprestimosList = emprestimoRepository.findAll().stream().map(EmprestimoResponseDto::new).toList();

        return ResponseEntity.ok(emprestimosList);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<EmprestimoResponseDto> atualizar(@RequestBody @Valid AtualizacaoEmprestimoDto data){
        var emprestimo = emprestimoRepository.getReferenceById(data.id());
        emprestimo.atualizarInformacao(data);

        return ResponseEntity.ok(new EmprestimoResponseDto(emprestimo));

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.inativar();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public void reativar(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.ativar();
    }

}
