package br.com.fluxoteca.backend.dto.Categoria;



import jakarta.validation.constraints.NotBlank;

public record CriacaoCategoriaDto(
    @NotBlank
    String nome
) {
    
}
