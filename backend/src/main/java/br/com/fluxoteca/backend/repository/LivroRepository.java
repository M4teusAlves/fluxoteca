package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long>{
    
}
