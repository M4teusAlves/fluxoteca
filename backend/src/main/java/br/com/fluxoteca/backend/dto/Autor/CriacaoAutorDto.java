package br.com.fluxoteca.backend.dto.Autor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriacaoAutorDto(
    @NotBlank
    @Size(min = 3, max = 70)
    String nome
) {
    
}
