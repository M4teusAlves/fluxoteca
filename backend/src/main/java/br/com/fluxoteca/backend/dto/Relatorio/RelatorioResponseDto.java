package br.com.fluxoteca.backend.dto.Relatorio;

import br.com.fluxoteca.backend.dto.Categoria.CategoriaResponseDto;
import br.com.fluxoteca.backend.dto.Leitor.LeitorResponseDto;
import br.com.fluxoteca.backend.dto.Livro.LivroResponseDto;

public record RelatorioResponseDto(
    Integer novosLeitores,
    Integer novosLivros,
    Integer novosExemplares,
    Integer emprestimosConcluidos,
    LivroResponseDto livroMaisEmprestado,
    CategoriaResponseDto categoriaMaisEmprestada,
    LeitorResponseDto leitorMaisAssiduo
) {
    
}
