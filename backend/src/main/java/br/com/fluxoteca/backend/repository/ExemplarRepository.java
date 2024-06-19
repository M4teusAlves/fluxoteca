package br.com.fluxoteca.backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.model.Livro;

import java.util.List;
import java.util.Optional;


public interface ExemplarRepository extends JpaRepository<Exemplar, String>{

    List<Exemplar> findByStatus(boolean status);

    @Query("select e from Livro l join l.exemplares e where e.status=true and e.livro=:livro")
    List<Exemplar> findByLivroActived(@Param("livro") Optional<Livro> livro);

    @Query("select count(*) as total from Exemplar where status=true and dataCriacao between :inicio and :fim")
    Integer findNumberExemplarsByDate(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

    List<Exemplar> findByLivro(Optional<Livro> livro);
}
