package br.com.fluxoteca.backend.dto.Exemplar;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Livro.LivroLittleResponseDto;
import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.model.enums.Estado;

public record ExemplarResponseDto(
    String id,
    LivroLittleResponseDto livro,
    String localizacao,
    Estado estado,
    LocalDate dataCriacao,
    LocalDate dataModificacao,
    boolean status
) {

    public ExemplarResponseDto(Exemplar exemplar){
        this(exemplar.getId(), new LivroLittleResponseDto(exemplar.getLivro()) , exemplar.getLocalizacao(), exemplar.getEstado(), exemplar.getDataCriacao(), exemplar.getDataModificacao(), exemplar.isStatus());
    }
    
}
