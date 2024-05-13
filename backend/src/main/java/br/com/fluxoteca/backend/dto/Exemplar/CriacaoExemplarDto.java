package br.com.fluxoteca.backend.dto.Exemplar;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriacaoExemplarDto(
    @NotBlank
    Long livroId,
    @NotBlank
    @Size(min = 3, max = 40)
    String localizacao
) {
    
}
