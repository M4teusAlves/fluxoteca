package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.fluxoteca.backend.model.Usuario;
import java.util.List;



public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    List<Usuario> findByStatus(boolean status);

    UserDetails findByLogin(String login);

    boolean existsByLogin(String login);

    
    
}
