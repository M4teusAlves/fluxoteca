package br.com.fluxoteca.backend.dto.Usuario;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoUsuarioDto(
    @NotNull
    Long id,
    @Size(max = 20)
    String login,
    @Size(max = 15)
    String senha
) {
    
}
