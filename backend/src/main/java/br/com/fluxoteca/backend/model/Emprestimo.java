package br.com.fluxoteca.backend.model;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Emprestimo.AtualizacaoEmprestimoDto;
import br.com.fluxoteca.backend.model.enums.EstadoEmprestimo;
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
    private Exemplar exemplar;
    @ManyToOne
    private Leitor leitor;
    private LocalDate dataDevolucao;
    private boolean status;
    private EstadoEmprestimo estado;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;

    public Emprestimo() {

        this.estado = EstadoEmprestimo.EM_DIA;
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

    public void atualizarEstado (){
        if(LocalDate.now().isEqual(this.dataDevolucao)){
            this.estado = EstadoEmprestimo.ULTIMO_DIA;
            this.dataModificacao = LocalDate.now();
        }else if (LocalDate.now().isBefore(this.dataDevolucao)){
            this.estado = EstadoEmprestimo.EM_DIA;
            this.dataModificacao = LocalDate.now();
        } else{
            this.estado = EstadoEmprestimo.ATRASADO;
            this.dataModificacao = LocalDate.now();
        }
    }

}
