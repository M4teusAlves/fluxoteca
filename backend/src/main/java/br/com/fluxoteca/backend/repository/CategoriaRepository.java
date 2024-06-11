package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Categoria;
import java.util.List;


public interface CategoriaRepository extends JpaRepository<Categoria,Long>{
    List<Categoria> findByStatus(boolean status);
}
