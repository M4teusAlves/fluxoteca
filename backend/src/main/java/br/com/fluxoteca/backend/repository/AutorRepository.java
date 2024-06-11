package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Autor;
import java.util.List;


public interface AutorRepository extends JpaRepository<Autor,Long>{
    
    List<Autor> findByStatus(boolean status);

}
