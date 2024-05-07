package br.com.fluxoteca.backend.dto.Emprestimo;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoEmprestimoDto(
    @NotNull
    Long id
) {
    
}
