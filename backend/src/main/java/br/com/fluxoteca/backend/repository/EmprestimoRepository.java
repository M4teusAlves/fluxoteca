package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long>{
    
}
