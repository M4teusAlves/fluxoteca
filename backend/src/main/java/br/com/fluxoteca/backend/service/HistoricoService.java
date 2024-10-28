package br.com.fluxoteca.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fluxoteca.backend.dto.Emprestimo.EmprestimoResponseDto;
import br.com.fluxoteca.backend.model.Leitor;
import br.com.fluxoteca.backend.model.enums.EstadoEmprestimo;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.LeitorRepository;
import jakarta.transaction.Transactional;

@Service
public class HistoricoService {

    @Autowired
    EmprestimoRepository emprestimoRepository;

    @Autowired
    LeitorRepository leitorRepository;
    
    @Transactional
    public List<EmprestimoResponseDto> historicoLeitor(Leitor leitor){

        var historico = emprestimoRepository.findActiveByLeitor(leitor).stream().map(EmprestimoResponseDto::new).toList(); 


        return historico;
    }


}
