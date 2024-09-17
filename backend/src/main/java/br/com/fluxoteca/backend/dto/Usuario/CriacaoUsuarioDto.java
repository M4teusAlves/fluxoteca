package br.com.fluxoteca.backend.dto.Usuario;

import br.com.fluxoteca.backend.model.enums.TipoUsuario;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record CriacaoUsuarioDto(
    @NotBlank
    @Size(min = 5, max = 20)
    String login,
    @NotBlank
    @Size(min = 8, max = 30)
    String senha) {
    
}
