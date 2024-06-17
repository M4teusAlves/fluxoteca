package br.com.fluxoteca.backend.dto.Exemplar;


import br.com.fluxoteca.backend.dto.Livro.LivroLittleResponseDto;
import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.model.enums.Estado;

public record ExemplarResponseDto(
    String id,
    LivroLittleResponseDto livro,
    String localizacao,
    Estado estado,
    boolean status
) {

    public ExemplarResponseDto(Exemplar exemplar){
        this(exemplar.getId(), new LivroLittleResponseDto(exemplar.getLivro()) , exemplar.getLocalizacao(), exemplar.getEstado(), exemplar.isStatus());
    }
    
}
