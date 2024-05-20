package br.com.fluxoteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fluxoteca.backend.model.Exemplar;

public interface ExemplarRepository extends JpaRepository<Exemplar, Long>{
    
}
