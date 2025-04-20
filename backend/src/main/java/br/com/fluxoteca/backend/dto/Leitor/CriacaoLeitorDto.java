package br.com.fluxoteca.backend.dto.Leitor;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CriacaoLeitorDto(
    @NotBlank
    @Size(min = 3, max = 70)
    String nome,
    @NotBlank
    @Size(min = 3, max = 100)
    String endereco,
    @NotBlank
    @Email
    @Size(min = 3, max = 50)
    String email,
    @NotBlank
    @Size(min = 3, max = 70)
    String afiliacao,
    @NotNull
    LocalDate dataNascimento,
    @NotBlank
    //(xx) x xxxx-xxxx
    @Size(max = 16)
    String telefone) {
    
}
