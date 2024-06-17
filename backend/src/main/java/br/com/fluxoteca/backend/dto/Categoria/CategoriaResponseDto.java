package br.com.fluxoteca.backend.dto.Categoria;


import br.com.fluxoteca.backend.model.Categoria;

public record CategoriaResponseDto(
    Long id,
    String nome,
    boolean status
) {

    public CategoriaResponseDto(Categoria categoria){
        this(categoria.getId(), categoria.getNome(), categoria.isStatus());
    }
    
}
