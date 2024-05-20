package br.com.fluxoteca.backend.dto.Livro;

import java.time.LocalDate;
import java.util.List;

import br.com.fluxoteca.backend.dto.Autor.AutorResponseDto;
import br.com.fluxoteca.backend.dto.Categoria.CategoriaResponseDto;
import br.com.fluxoteca.backend.dto.Exemplar.ExemplarResponseDto;
import br.com.fluxoteca.backend.model.Livro;

public record LivroResponseDto(
    Long id,
    String nome,
    CategoriaResponseDto categoria,
    AutorResponseDto autor,
    List<ExemplarResponseDto> exemplares,
    boolean status,
    LocalDate dataCriacao,
    LocalDate dataModificacao
) {

    public LivroResponseDto(Livro livro){
        this(livro.getId(), livro.getNome(), new CategoriaResponseDto(livro.getCategoria()), new AutorResponseDto(livro.getAutor()), livro.getExemplares().stream().map(ExemplarResponseDto::new).toList() , livro.isStatus(), livro.getDataCriacao(), livro.getDataModificacao());
    }
    
}
