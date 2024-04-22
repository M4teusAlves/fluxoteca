package br.com.fluxoteca.backend.dto.Autor;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.Autor;

public record AutorResponseDto(
    Long id,
    String nome,
    LocalDate dataCriacao,
    LocalDate dataModificacao,
    boolean status
) {

    public AutorResponseDto(Autor autor){
        this(autor.getId(), autor.getNome(), autor.getDataCriacao(), autor.getDataModificacao(), autor.isStatus());
    }
    
}
