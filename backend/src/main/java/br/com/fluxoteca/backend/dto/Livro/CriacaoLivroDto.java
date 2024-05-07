package br.com.fluxoteca.backend.dto.Livro;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CriacaoLivroDto(

    @NotBlank
    String nome,
    @NotNull
    Long categoria,
    @NotNull
    Long autor


) {
    
}
