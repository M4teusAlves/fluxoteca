package br.com.fluxoteca.backend.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.fluxoteca.backend.dto.Relatorio.RelatorioResponseDto;
import br.com.fluxoteca.backend.service.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name="Relatórios")
public class RelatorioController {

    @Autowired
    RelatorioService relatorioService;

    @GetMapping
    @Operation(summary = "Retorna um relatório Semestral")
    public ResponseEntity<RelatorioResponseDto> relatorioSemestral(){

        var relatorio = relatorioService.relatorioPorData(LocalDate.now().minusMonths(6), LocalDate.now());

        return ResponseEntity.ok(relatorio);
    }
    
    
}
