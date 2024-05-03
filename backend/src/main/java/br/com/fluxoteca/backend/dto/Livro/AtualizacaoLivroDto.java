package br.com.fluxoteca.backend.dto.Livro;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoLivroDto(

    @NotNull
    Long id,
    String nome

) {
    
}
