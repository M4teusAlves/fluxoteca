package br.com.fluxoteca.backend.dto.Authentication;

import br.com.fluxoteca.backend.dto.Usuario.UsuarioResponseDto;

public record TokenJWTDataDto(

    String token,
    UsuarioResponseDto usuario

) {

}
