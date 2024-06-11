package br.com.fluxoteca.backend.dto.Exemplar;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoExemplarDto(
    @NotNull
    String id,
    @Size(min = 3, max = 40)
    String localizacao
) {
    
}
