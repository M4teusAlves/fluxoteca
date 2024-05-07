package br.com.fluxoteca.backend.model;

import java.time.LocalDate;

import org.hibernate.annotations.ManyToAny;

import br.com.fluxoteca.backend.dto.Emprestimo.AtualizacaoEmprestimoDto;
import br.com.fluxoteca.backend.dto.Exemplar.AtualizacaoExemplarDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "emprestimos")
@AllArgsConstructor
@Getter
@Setter
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Livro livro;
    @ManyToOne
    private Leitor leitor;
    private LocalDate dataDevolucao;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;

    public Emprestimo() {

        this.status = true;
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
    }

    public void atualizarInformacao(@Valid AtualizacaoEmprestimoDto data){
            
        
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
