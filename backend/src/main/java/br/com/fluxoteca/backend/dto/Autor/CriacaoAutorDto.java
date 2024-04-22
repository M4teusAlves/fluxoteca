package br.com.fluxoteca.backend.dto.Autor;

import jakarta.validation.constraints.NotBlank;

public record CriacaoAutorDto(
    @NotBlank
    String nome
) {
    
}
