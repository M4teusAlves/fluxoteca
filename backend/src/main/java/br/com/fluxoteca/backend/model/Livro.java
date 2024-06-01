package br.com.fluxoteca.backend.model;

import java.time.LocalDate;
import java.util.List;

import br.com.fluxoteca.backend.dto.Livro.AtualizacaoLivroDto;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
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
    @ManyToOne
    private Autor autor;
    @ManyToOne
    private Categoria categoria;
    @OneToMany(mappedBy = "livro", fetch = FetchType.EAGER)
    private List<Exemplar> exemplares;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;

    public Livro() {
        this.setExemplares(exemplares);
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
        this.status = true;
    }

    public void atualizarInformacao(@Valid AtualizacaoLivroDto data){

        if( data.nome() != null && !data.nome().isEmpty()){
            this.nome = data.nome();
            this.dataModificacao = LocalDate.now();
        }
            
        
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
