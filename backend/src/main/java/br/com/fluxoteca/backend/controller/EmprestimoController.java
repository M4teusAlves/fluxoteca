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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.fluxoteca.backend.dto.Emprestimo.AtualizacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Emprestimo.CriacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Emprestimo.EmprestimoResponseDto;
import br.com.fluxoteca.backend.dto.Historico.HistoricoLivroDto;
import br.com.fluxoteca.backend.model.Emprestimo;
import br.com.fluxoteca.backend.model.enums.Estado;
import br.com.fluxoteca.backend.model.enums.EstadoEmprestimo;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.ExemplarRepository;
import br.com.fluxoteca.backend.repository.LeitorRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import br.com.fluxoteca.backend.service.HistoricoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/emprestimos")
@CrossOrigin(origins = "*")
@Tag(name="Empréstimos")
public class EmprestimoController {
    
    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private LeitorRepository leitorRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private HistoricoService historicoService;


    @PostMapping
    @Transactional
    @Operation(summary = "Cria um empréstimo")
    public ResponseEntity<EmprestimoResponseDto> criar(@RequestBody @Valid CriacaoEmprestimoDto data, UriComponentsBuilder uriBuilder){
        Emprestimo emprestimo = new Emprestimo();

        if(!exemplarRepository.existsById(data.exemplar()) || !leitorRepository.existsById(data.leitor()))
            return ResponseEntity.notFound().build();

        var exemplar = exemplarRepository.getReferenceById(data.exemplar());

        if(!exemplar.getEstado().equals(Estado.DISPONIVEL))
            return ResponseEntity.badRequest().build();

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
    public ResponseEntity<List<EmprestimoResponseDto>> buscaPorStatus(@PathVariable boolean status) {

        var emprestimosList = emprestimoRepository.findByStatus(status).stream().map(EmprestimoResponseDto::new).toList();

        return ResponseEntity.ok(emprestimosList);
    }

    @GetMapping("estado/{estado}")
    @Operation(summary = "Lista emprestimos por estado")
    public ResponseEntity<List<EmprestimoResponseDto>> buscaPorEstado(@PathVariable EstadoEmprestimo estado) {

        var emprestimosList = emprestimoRepository.findByEstadoAtivo(estado).stream().map(EmprestimoResponseDto::new).toList();

        return ResponseEntity.ok(emprestimosList);
    }

    @GetMapping("leitor/historico/{id}")
    @Transactional
    @Operation(summary = "Gera o histórico de empréstimos do leitor")
    public ResponseEntity<List<EmprestimoResponseDto>> geraHistoricoLeitor (@PathVariable Long id) {

        var leitor = leitorRepository.getReferenceById(id);
        
        if(leitor == null)
            return ResponseEntity.notFound().build();

        var historico = historicoService.historicoLeitor(leitor);

        return ResponseEntity.ok(historico);
    }

    @GetMapping("livro/historico/{id}")
    @Transactional
    @Operation(summary = "Gera o histórico de empréstimos do livro")
    public ResponseEntity<HistoricoLivroDto> geraHistoricoLivro (@PathVariable Long id) {

        var livro = livroRepository.getReferenceById(id);
        
        if(livro == null)
            return ResponseEntity.notFound().build();

        var historico = historicoService.historicoLivro(livro);

        return ResponseEntity.ok(historico);
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

    @PutMapping("finalizar/{id}")
    @Transactional
    @Operation(summary = "Finaliza um empréstimo")
    public ResponseEntity<Void> finalizarEmprestimo(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.setEstado(EstadoEmprestimo.FINALIZADO);
        emprestimo.getExemplar().setEstado(Estado.DISPONIVEL);
        return ResponseEntity.ok().build();
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
        emprestimoRepository.findToValidation().stream().forEach((emprestimo) -> { emprestimo.atualizarEstado(); });
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Deleta um empréstimo")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        var emprestimo = emprestimoRepository.getReferenceById(id);
        emprestimo.inativar();
        return ResponseEntity.noContent().build();
    }

    



}
