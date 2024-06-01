package br.com.fluxoteca.backend.dto.Emprestimo;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.enums.EstadoEmprestimo;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

public record AtualizacaoEmprestimoDto(
    @NotNull
    Long id,
    @Future
    LocalDate dataDevolucao,
    @Enumerated
    EstadoEmprestimo estado,
    Long leitor,
    Long exemplar
) {
    
}
