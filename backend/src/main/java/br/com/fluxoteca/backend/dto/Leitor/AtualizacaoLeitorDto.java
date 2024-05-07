package br.com.fluxoteca.backend.dto.Leitor;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.enums.Tipo;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

public record AtualizacaoLeitorDto(
    @NotNull
    Long id,
    String nome,
    String endereco,
    String email,
    String afiliacao,
    LocalDate dataNascimento,
    @Enumerated
    Tipo tipo,
    String telefone
) {
    
}
