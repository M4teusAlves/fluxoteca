package br.com.fluxoteca.backend.dto.Autor;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoAutorDto(

    @NotNull
    Long id,
    String nome

) {
    
}
