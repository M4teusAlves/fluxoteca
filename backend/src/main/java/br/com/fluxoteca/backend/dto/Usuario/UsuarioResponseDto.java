package br.com.fluxoteca.backend.dto.Usuario;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.Usuario;

public record UsuarioResponseDto(

    Long id,
    String login,
    boolean status,
    LocalDate dataCriacao,
    LocalDate dataModificacao

) {

    public UsuarioResponseDto(Usuario usuario){
        
        this(usuario.getId(), usuario.getLogin(), usuario.isStatus(), usuario.getDataCriacao(), usuario.getDataModificacao());
    }
     
}
