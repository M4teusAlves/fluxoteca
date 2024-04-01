package br.com.fluxoteca.backend.dto.Usuario;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.enums.Tipo;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CriacaoUsuarioDto(
    @NotBlank
    String nome,
    @NotBlank
    String endereco,
    @NotBlank
    @Email
    String email,
    @NotBlank
    String senha,
    @NotBlank
    String afiliacao,
    @NotNull
    LocalDate dataNascimento,
    @NotNull
    @Enumerated
    Tipo tipo,
    @NotBlank
    String telefone) {
    
}
