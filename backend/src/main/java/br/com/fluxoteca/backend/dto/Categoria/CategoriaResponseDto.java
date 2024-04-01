package br.com.fluxoteca.backend.dto.Categoria;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.Categoria;

public record CategoriaResponseDto(
    Long id,
    String nome,
    LocalDate dataCriacao,
    LocalDate dataModificacao
) {

    public CategoriaResponseDto(Categoria categoria){
        this(categoria.getId(), categoria.getNome(), categoria.getDataCriacao(), categoria.getDataModificacao());
    }
    
}
