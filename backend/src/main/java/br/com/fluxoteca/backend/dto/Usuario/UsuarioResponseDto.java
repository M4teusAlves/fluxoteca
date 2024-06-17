package br.com.fluxoteca.backend.dto.Usuario;

import br.com.fluxoteca.backend.model.Usuario;

public record UsuarioResponseDto(

    Long id,
    String login,
    boolean status

) {

    public UsuarioResponseDto(Usuario usuario){
        
        this(usuario.getId(), usuario.getLogin(), usuario.isStatus());
    }
     
}
