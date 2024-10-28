package br.com.fluxoteca.backend.dto.Historico;

import java.util.List;

import br.com.fluxoteca.backend.dto.Emprestimo.EmprestimoResponseDto;

public record HistoricoLivroDto(
    Long media,
    List<EmprestimoResponseDto> emprestimos
) {
    
}
