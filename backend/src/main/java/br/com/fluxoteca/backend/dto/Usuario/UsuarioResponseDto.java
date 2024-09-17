package br.com.fluxoteca.backend.dto.Usuario;

import br.com.fluxoteca.backend.model.Usuario;
import br.com.fluxoteca.backend.model.enums.TipoUsuario;

public record UsuarioResponseDto(

    Long id,
    String login,
    TipoUsuario tipo,
    boolean status

) {

    public UsuarioResponseDto(Usuario usuario){
        
        this(usuario.getId(), usuario.getLogin(), usuario.getTipo(), usuario.isStatus());
    }
     
}
