package br.com.fluxoteca.backend.dto.Usuario;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoUsuarioDto(
    @NotNull
    Long id,
    @Size(min = 3, max = 20)
    String login,
    @Size(min = 8, max = 15)
    String senha
) {
    
}
