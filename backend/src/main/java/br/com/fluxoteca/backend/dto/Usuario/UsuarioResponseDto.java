package br.com.fluxoteca.backend.dto.Usuario;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.Usuario;
import br.com.fluxoteca.backend.model.enums.Tipo;

public record UsuarioResponseDto(

    Long id,
    String nome,
    String endereco,
    String email,
    String afiliacao,
    LocalDate dataNascimento,
    Tipo tipo,
    String telefone,
    boolean status,
    LocalDate dataCriacao,
    LocalDate dataModificacao

) {

    public UsuarioResponseDto(Usuario usuario){
        this(usuario.getId(), usuario.getNome(), usuario.getEndereco(), usuario.getEmail(), usuario.getAfiliacao(), usuario.getDataNascimento(), usuario.getTipo(), usuario.getTelefone(), usuario.isStatus(), usuario.getDataCriacao(), usuario.getDataModificacao());
    }
     
}
