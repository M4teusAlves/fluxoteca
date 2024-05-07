package br.com.fluxoteca.backend.dto.Usuario;

import jakarta.validation.constraints.NotBlank;

public record AutenticaLoginDto(
    @NotBlank
    String login,
    @NotBlank
    String senha
) {
    
}
