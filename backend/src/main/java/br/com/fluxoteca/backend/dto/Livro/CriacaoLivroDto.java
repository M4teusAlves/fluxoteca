package br.com.fluxoteca.backend.dto.Livro;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CriacaoLivroDto(

    @NotBlank
    @Size(min = 3, max = 90)
    String nome,
    @Size(max=200)
    String observacao,
    @NotNull
    Long categoria,
    @NotNull
    Long autor


) {
    
}
