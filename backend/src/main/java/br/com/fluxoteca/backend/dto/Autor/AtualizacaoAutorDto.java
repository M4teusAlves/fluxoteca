package br.com.fluxoteca.backend.dto.Autor;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoAutorDto(

    @NotNull
    Long id,
    @Size( max = 70)
    String nome

) {
    
}
