package br.com.fluxoteca.backend.dto.Livro;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CriacaoLivroDto(

    @NotBlank
    String nome


) {
    
}
