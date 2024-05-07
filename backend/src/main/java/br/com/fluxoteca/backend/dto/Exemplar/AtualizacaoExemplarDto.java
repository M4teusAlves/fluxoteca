package br.com.fluxoteca.backend.dto.Exemplar;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoExemplarDto(
    @NotNull
    Long id,
    String localizacao
) {
    
}
