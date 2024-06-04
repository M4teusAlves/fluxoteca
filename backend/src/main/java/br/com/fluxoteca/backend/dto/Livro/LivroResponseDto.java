package br.com.fluxoteca.backend.dto.Livro;

import br.com.fluxoteca.backend.model.Livro;

public record LivroResponseDto(
    Long id,
    String nome,
    String categoria,
    String autor,
    boolean status
) {

    public LivroResponseDto(Livro livro){
        this(livro.getId(), livro.getNome(), livro.getCategoria().getNome(), livro.getAutor().getNome(), livro.isStatus());
    }
    
}
