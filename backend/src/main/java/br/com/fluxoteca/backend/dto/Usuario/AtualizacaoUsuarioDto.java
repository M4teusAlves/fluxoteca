package br.com.fluxoteca.backend.dto.Usuario;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoUsuarioDto(
    @NotNull
    Long id,
    String login,
    String senha
) {
    
}
