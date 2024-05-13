package br.com.fluxoteca.backend.dto.Categoria;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoCategoriaDto(
    @NotNull
    Long id,
    @Size( max = 30)
    String nome
) {
    
}
