package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fluxoteca.backend.model.Categoria;
import br.com.fluxoteca.backend.model.Emprestimo;
import br.com.fluxoteca.backend.model.Leitor;
import br.com.fluxoteca.backend.model.Livro;

import java.time.LocalDate;
import java.util.List;
import br.com.fluxoteca.backend.model.enums.EstadoEmprestimo;



public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long>{
    
    List<Emprestimo> findByStatus(boolean status);

    @Query("select e from Emprestimo e where status=true and estado!=FINALIZADO")
    List<Emprestimo> findToValidation();

    @Query("select e from Emprestimo e where status=true and estado=:estado")
    List<Emprestimo> findByEstadoAtivo(@Param("estado")EstadoEmprestimo estado);

    @Query("select count(*) as total from Emprestimo where status=true and estado=FINALIZADO and dataCriacao between :inicio and :fim")
    Integer findNumberFinalized(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

    @Query("select l from Emprestimo em join em.exemplar e join e.livro l where em.status=true and em.dataCriacao between :inicio and :fim group by l.id order by count(l.id) desc limit 1")
    Livro findMostBorrowedBook(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

    @Query("select c from Emprestimo em join em.exemplar e join e.livro l join l.categoria c where em.status=true and em.dataCriacao between :inicio and :fim group by c.id order by count(c.id) desc limit 1")
    Categoria findMostBorrowedCategory(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);

    @Query("select l from Emprestimo em join em.leitor l where em.status=true and em.dataCriacao between :inicio and :fim group by l.id order by count(l.id) desc limit 1")
    Leitor findMostFrequentReader(@Param("inicio")LocalDate inicio, @Param("fim")LocalDate fim);
}
