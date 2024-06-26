package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.fluxoteca.backend.model.Usuario;
import java.util.List;



public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    List<Usuario> findByStatus(boolean status);

    @Query("select u from Usuario u where login=:login and status=true")
    UserDetails findByLoginStatus(@Param("login")String login);

    boolean existsByLogin(String login);

    
    
}
