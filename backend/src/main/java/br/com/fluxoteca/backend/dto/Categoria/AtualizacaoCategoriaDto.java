package br.com.fluxoteca.backend.dto.Categoria;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoCategoriaDto(
    @NotNull
    Long id,
    String nome
) {
    
}
