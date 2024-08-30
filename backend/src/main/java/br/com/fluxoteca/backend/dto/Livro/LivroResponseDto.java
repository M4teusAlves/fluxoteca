package br.com.fluxoteca.backend.dto.Livro;

import java.util.List;

import br.com.fluxoteca.backend.dto.Exemplar.ExemplarResponseDto;
import br.com.fluxoteca.backend.model.Livro;

public record LivroResponseDto(
    Long id,
    String nome,
    String observacao,
    String categoria,
    String autor,
    boolean status,
    List<ExemplarResponseDto> exemplares
) {

    public LivroResponseDto(Livro livro){
        this(livro.getId(), livro.getNome(), livro.getObservacao(), livro.getCategoria().getNome(), livro.getAutor().getNome(), livro.isStatus(), livro.getExemplares().stream().map(ExemplarResponseDto::new).toList());
    }
    
}
