package br.com.fluxoteca.backend.dto.Exemplar;

import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import br.com.fluxoteca.backend.model.enums.Estado;

public record AtualizacaoExemplarDto(
    @NotNull
    String id,
    @Size(min = 3, max = 40)
    String localizacao,
    @Enumerated
    Estado estado
) {
    
}
