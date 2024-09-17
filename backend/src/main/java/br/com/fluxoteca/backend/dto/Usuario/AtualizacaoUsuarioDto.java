package br.com.fluxoteca.backend.dto.Usuario;

import br.com.fluxoteca.backend.model.enums.TipoUsuario;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoUsuarioDto(
    @NotNull
    Long id,
    @Size(max = 20)
    String login,
    @Enumerated
    TipoUsuario tipo,
    @Size(max = 15)
    String senha
) {
    
}
