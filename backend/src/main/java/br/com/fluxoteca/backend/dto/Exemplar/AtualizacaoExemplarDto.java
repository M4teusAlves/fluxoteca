package br.com.fluxoteca.backend.dto.Exemplar;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoExemplarDto(
    @NotNull
    Long id,
    @Size(max = 70)
    String localizacao
) {
    
}
