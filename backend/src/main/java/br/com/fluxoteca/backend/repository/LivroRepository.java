package br.com.fluxoteca.backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fluxoteca.backend.model.Livro;
import java.util.List;


public interface LivroRepository extends JpaRepository<Livro, Long>{

    List<Livro> findByStatus(boolean status);
    
    @Query("select count(*) as total from Livro where status=true and dataCriacao between :inicio and :fim")
    Integer findNumberBooksByDate(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

}
