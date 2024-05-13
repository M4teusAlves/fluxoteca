package br.com.fluxoteca.backend.dto.Livro;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoLivroDto(

    @NotNull
    Long id,
    @Size(max = 90)
    String nome

) {
    
}
