package br.com.fluxoteca.backend.model;

import java.time.LocalDate;

import br.com.fluxoteca.backend.model.enums.Estado;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "exemplares")
@AllArgsConstructor
@Getter
@Setter
public class Exemplar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Livro livro;
    private Estado estado;
    private String localizacao;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;

}
