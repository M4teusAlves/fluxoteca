package br.com.fluxoteca.backend.dto.Autor;

import br.com.fluxoteca.backend.model.Autor;

public record AutorResponseDto(
    Long id,
    String nome,
    boolean status
) {

    public AutorResponseDto(Autor autor){
        this(autor.getId(), autor.getNome(), autor.isStatus());
    }
    
}
