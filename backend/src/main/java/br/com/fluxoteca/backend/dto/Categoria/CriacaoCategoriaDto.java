package br.com.fluxoteca.backend.dto.Categoria;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriacaoCategoriaDto(
    @NotBlank
    @Size(min = 3, max = 30)
    String nome
) {
    
}
