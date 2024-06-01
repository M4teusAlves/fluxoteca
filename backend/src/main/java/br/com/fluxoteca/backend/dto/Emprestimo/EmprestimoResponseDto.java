package br.com.fluxoteca.backend.dto.Emprestimo;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Exemplar.ExemplarResponseDto;
import br.com.fluxoteca.backend.dto.Leitor.LeitorResponseDto;
import br.com.fluxoteca.backend.model.Emprestimo;
import br.com.fluxoteca.backend.model.enums.EstadoEmprestimo;

public record EmprestimoResponseDto(
    Long id,
    ExemplarResponseDto exemplar,
    LeitorResponseDto leitor,
    LocalDate dataDevolucao,
    LocalDate dataCriacao,
    LocalDate dataModificacao,
    EstadoEmprestimo estado,
    boolean status
) {

    public EmprestimoResponseDto(Emprestimo emprestimo){
        this(emprestimo.getId(), new ExemplarResponseDto(emprestimo.getExemplar()), new LeitorResponseDto(emprestimo.getLeitor()), emprestimo.getDataDevolucao(), emprestimo.getDataCriacao(), emprestimo.getDataModificacao(), emprestimo.getEstado() ,emprestimo.isStatus());
    }
    
}
