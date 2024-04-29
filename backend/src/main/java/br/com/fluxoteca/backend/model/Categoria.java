package br.com.fluxoteca.backend.model;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Categoria.AtualizacaoCategoriaDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Categoria
 */
@Entity
@Table(name = "categorias")
@AllArgsConstructor
@Getter
@Setter
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;

    public Categoria() {
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
        this.status = true;
    }


    public void atualizarInformacao(@Valid AtualizacaoCategoriaDto data){

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