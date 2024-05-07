package br.com.fluxoteca.backend.dto.Leitor;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.Leitor;

public record LeitorResponseDto(

    Long id,
    String nome,
    String endereco,
    String email,
    String afiliacao,
    LocalDate dataNascimento,
    String telefone,
    boolean status,
    LocalDate dataCriacao,
    LocalDate dataModificacao

) {

    public LeitorResponseDto(Leitor usuario){
        this(usuario.getId(), usuario.getNome(), usuario.getEndereco(), usuario.getEmail(), usuario.getAfiliacao(), usuario.getDataNascimento(), usuario.getTelefone(), usuario.isStatus(), usuario.getDataCriacao(), usuario.getDataModificacao());
    }
     
}
