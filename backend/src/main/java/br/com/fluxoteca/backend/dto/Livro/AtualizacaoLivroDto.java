package br.com.fluxoteca.backend.dto.Livro;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AtualizacaoLivroDto(

    @NotNull
    Long id,
    @Size(min = 3, max = 90)
    String nome,
    @Size(max=200)
    String observacao,
    Long categoria,
    Long autor
) {
    
}
