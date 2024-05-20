package br.com.fluxoteca.backend.dto.Emprestimo;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

public record AtualizacaoEmprestimoDto(
    @NotNull
    Long id,
    @Future
    LocalDate dataDevolucao,
    Long leitor,
    Long exemplar
) {
    
}
