package br.com.fluxoteca.backend.dto.Livro;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Autor.AutorResponseDto;
import br.com.fluxoteca.backend.dto.Categoria.CategoriaResponseDto;
import br.com.fluxoteca.backend.model.Livro;

public record LivroResponseDto(
    Long id,
    String nome,
    CategoriaResponseDto categoria,
    AutorResponseDto autor,
    boolean status,
    LocalDate dataCriacao,
    LocalDate dataModificacao
) {

    public LivroResponseDto(Livro livro){
        this(livro.getId(), livro.getNome(), new CategoriaResponseDto(livro.getCategoria()), new AutorResponseDto(livro.getAutor()), livro.isStatus(), livro.getDataCriacao(), livro.getDataModificacao());
    }
    
}
