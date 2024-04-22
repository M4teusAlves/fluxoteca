package br.com.fluxoteca.backend.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "livros")
@AllArgsConstructor
@Getter
@Setter
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @OneToMany
    private List<Autor> autores;
    @ManyToOne
    private Categoria categoria;
    @OneToMany
    private List<Exemplar> exemplares;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;

    public Livro() {
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
        this.status = true;
    }

    public void inativar() {
        if(this.status == true){
            this.status = false;
            this.dataModificacao = LocalDate.now();
        }
        
    }

    public void ativar() {
        if(this.status == false){
            this.status = true;
            this.dataModificacao = LocalDate.now();
        }
    }

}
