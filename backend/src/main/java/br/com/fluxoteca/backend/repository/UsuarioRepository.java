package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    
    
}
