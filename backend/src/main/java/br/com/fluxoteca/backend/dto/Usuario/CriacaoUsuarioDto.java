package br.com.fluxoteca.backend.dto.Usuario;

import jakarta.validation.constraints.NotBlank;


public record CriacaoUsuarioDto(
    @NotBlank
    String login,
    @NotBlank
    String senha) {
    
}
