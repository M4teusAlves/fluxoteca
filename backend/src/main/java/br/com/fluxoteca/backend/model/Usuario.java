package br.com.fluxoteca.backend.model;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.fluxoteca.backend.dto.Usuario.AtualizacaoUsuarioDto;
import br.com.fluxoteca.backend.model.enums.Tipo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@AllArgsConstructor
public class Usuario implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String endereco;
    private String email;
    private String senha;
    private String afiliacao;
    private LocalDate dataNascimento;
    private Tipo tipo;
    private String telefone;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;
    
    public Usuario() {
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
        this.status = true;
    }

    public void atualizarInformacao(@Valid AtualizacaoUsuarioDto data){

        if( data.nome() != null && !data.nome().isEmpty()){
            this.nome = data.nome();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.endereco() != null && !data.endereco().isEmpty()){
            this.endereco = data.endereco();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.email() != null && !data.email().isEmpty()){
            this.email = data.email();
            this.dataModificacao = LocalDate.now();
        }
            

        if( data.senha() != null && !data.senha().isEmpty()){
            this.senha = data.senha();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.afiliacao() != null && !data.afiliacao().isEmpty()){
            this.afiliacao = data.afiliacao();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.telefone() != null && !data.telefone().isEmpty()){
            this.telefone = data.telefone();
            this.dataModificacao = LocalDate.now();
        }
            
        if(data.dataNascimento() != null){
            this.dataNascimento = data.dataNascimento();
            this.dataModificacao = LocalDate.now();
        }

        if(data.tipo() != null){
            this.tipo = data.tipo();
            this.dataModificacao = LocalDate.now();
        }
            
        
    }

    public void inativar() {
        if(this.status == true){
            this.status = false;
            this.dataModificacao = LocalDate.now();
        }
        
    }

    public void ativar() {
        if(this.status == false){
            this.status = true;
            this.dataModificacao = LocalDate.now();
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    
}
