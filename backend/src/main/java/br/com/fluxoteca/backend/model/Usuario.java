package br.com.fluxoteca.backend.model;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.fluxoteca.backend.dto.Usuario.AtualizacaoUsuarioDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String senha;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;
    
    public Usuario() {
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
        this.status = false;
    }

    public void atualizarInformacao(@Valid AtualizacaoUsuarioDto data){

        if( data.login() != null && !data.login().isEmpty()){
            this.login = data.login();
            this.dataModificacao = LocalDate.now();
        }
            
    
            

        if( data.senha() != null && !data.senha().isEmpty()){
            this.senha = data.senha();
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
       
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {

        return senha;
    }

    @Override
    public String getUsername() {
        
        return login;
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
