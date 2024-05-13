package br.com.fluxoteca.backend.dto.Leitor;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.enums.Tipo;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AtualizacaoLeitorDto(
    @NotNull
    Long id,
    @Size( max = 70)
    String nome,
    @Size( max = 100)
    String endereco,
    @Email
    @Size( max = 50)
    String email,
    @Size( max = 70)
    String afiliacao,
    LocalDate dataNascimento,
    @Enumerated
    Tipo tipo,
    @Size(max = 16)
    @Pattern(regexp = "^\\(\\d{2}\\)\\ \\d\\ \\d{4}\\-\\d{4}$")
    String telefone
) {
    
}
