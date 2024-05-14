package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Emprestimo;
import java.util.List;


public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long>{
    
    List<Emprestimo> findByStatus(boolean status);

}
