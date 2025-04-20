package br.com.fluxoteca.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.ExemplarRepository;

@Service
public class ExemplarService {
    
    @Autowired
    ExemplarRepository exemplarRepository;

    @Autowired
    EmprestimoRepository emprestimoRepository;


    public void deletarExemplar(Exemplar exemplar){

        var emprestimos = emprestimoRepository.findByExemplar(exemplar);

        emprestimoRepository.deleteAll(emprestimos);

        exemplarRepository.delete(exemplar);


    }


}
