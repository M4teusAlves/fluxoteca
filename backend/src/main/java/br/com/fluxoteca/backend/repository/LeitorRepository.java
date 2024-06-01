package br.com.fluxoteca.backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fluxoteca.backend.model.Leitor;

public interface LeitorRepository extends JpaRepository<Leitor, Long> {
    
    @Query("select count(*) as total from Leitor where status=true and dataCriacao between :inicio and :fim")
    Integer findNumberReadersByDate(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

}
