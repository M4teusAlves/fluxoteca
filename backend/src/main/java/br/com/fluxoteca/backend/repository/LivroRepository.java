package br.com.fluxoteca.backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fluxoteca.backend.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long>{
    
    @Query("select count(*) as total from Livro where status=true and dataCriacao between :inicio and :fim")
    Integer findNumberBooksByDate(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

}
