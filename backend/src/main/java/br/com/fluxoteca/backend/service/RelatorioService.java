package br.com.fluxoteca.backend.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fluxoteca.backend.dto.Categoria.CategoriaResponseDto;
import br.com.fluxoteca.backend.dto.Leitor.LeitorResponseDto;
import br.com.fluxoteca.backend.dto.Livro.LivroResponseDto;
import br.com.fluxoteca.backend.dto.Relatorio.RelatorioResponseDto;
import br.com.fluxoteca.backend.model.Categoria;
import br.com.fluxoteca.backend.model.Leitor;
import br.com.fluxoteca.backend.model.Livro;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.ExemplarRepository;
import br.com.fluxoteca.backend.repository.LeitorRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;

@Service
public class RelatorioService {
    @Autowired
    LeitorRepository leitorRepository;

    @Autowired
    LivroRepository livroRepository;

    @Autowired
    ExemplarRepository exemplarRepository;

    @Autowired
    EmprestimoRepository emprestimoRepository;

    
    public RelatorioResponseDto relatorioPorData(LocalDate inicio, LocalDate fim){
        
        int novosLeitores = leitorRepository.findNumberReadersByDate(inicio, fim);

        int novosLivros = livroRepository.findNumberBooksByDate(inicio, fim);

        int novosExemplares = exemplarRepository.findNumberExemplarsByDate(inicio, fim);

        int emprestimosConcluidos = emprestimoRepository.findNumberFinalized(inicio, fim);

        Livro livroMaisEmprestado = emprestimoRepository.findMostBorrowedBook(inicio, fim);

        LivroResponseDto livroMaisEmprestadoResponse;

        Categoria categoriaMaisEmprestada = emprestimoRepository.findMostBorrowedCategory(inicio, fim);

        CategoriaResponseDto categoriaMaisEmprestadaResponse;

        Leitor leitorMaisAssiduo = emprestimoRepository.findMostFrequentReader(inicio, fim);

        LeitorResponseDto leitorMaisAssiduoResponse;


        if(livroMaisEmprestado == null)
            livroMaisEmprestadoResponse = null;
        else
            livroMaisEmprestadoResponse = new LivroResponseDto(livroMaisEmprestado);

        if(categoriaMaisEmprestada == null)
            categoriaMaisEmprestadaResponse = null;
        else
            categoriaMaisEmprestadaResponse = new CategoriaResponseDto(categoriaMaisEmprestada);

        if(leitorMaisAssiduo == null)
            leitorMaisAssiduoResponse = null;
        else
            leitorMaisAssiduoResponse = new LeitorResponseDto(leitorMaisAssiduo);

        var relatorio = new RelatorioResponseDto(novosLeitores, novosLivros, novosExemplares, emprestimosConcluidos, livroMaisEmprestadoResponse, categoriaMaisEmprestadaResponse, leitorMaisAssiduoResponse);


        return relatorio;
    }
}
