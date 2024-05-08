package br.com.fluxoteca.backend.model;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Exemplar.AtualizacaoExemplarDto;
import br.com.fluxoteca.backend.model.enums.Estado;
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

    public Exemplar() {

        this.estado = Estado.DISPONIVEL;
        this.status = true;
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now(); 
    }

    public void atualizarInformacao(@Valid AtualizacaoExemplarDto data){

        if( data.localizacao() != null && !data.localizacao().isEmpty()){
            this.localizacao = data.localizacao();
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
