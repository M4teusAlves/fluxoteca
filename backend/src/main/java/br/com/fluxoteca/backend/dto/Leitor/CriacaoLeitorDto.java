package br.com.fluxoteca.backend.dto.Leitor;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CriacaoLeitorDto(
    @NotBlank
    String nome,
    @NotBlank
    String endereco,
    @NotBlank
    @Email
    String email,
    @NotBlank
    String afiliacao,
    @NotNull
    LocalDate dataNascimento,
    @NotBlank
    String telefone) {
    
}
