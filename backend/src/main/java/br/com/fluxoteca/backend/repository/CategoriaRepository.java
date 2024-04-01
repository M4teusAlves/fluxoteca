package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria,Long>{
    
}
