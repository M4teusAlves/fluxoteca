package br.com.fluxoteca.backend.dto.Exemplar;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CriacaoExemplarDto(
    @NotBlank
    String id,
    @NotNull
    Long livroId,
    @NotBlank
    @Size(min = 3, max = 40)
    String localizacao
) {
    
}
