package br.com.fluxoteca.backend.dto.Exemplar;



import jakarta.validation.constraints.NotBlank;

public record CriacaoExemplarDto(
    @NotBlank
    Long livroId,
    @NotBlank
    String localizacao
) {
    
}
