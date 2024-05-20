package br.com.fluxoteca.backend.dto.Livro;

import br.com.fluxoteca.backend.model.Livro;

public record LivroLittleResponseDto(
    Long id,
    String nome
) {
    
    public LivroLittleResponseDto(Livro livro){
        
        this(livro.getId(), livro.getNome());

    }

}
