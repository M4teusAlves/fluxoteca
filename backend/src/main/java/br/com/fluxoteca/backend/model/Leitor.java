package br.com.fluxoteca.backend.model;

import java.time.LocalDate;

import br.com.fluxoteca.backend.dto.Leitor.AtualizacaoLeitorDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "leitores")
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Leitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String endereco;
    private String email;
    private String afiliacao;
    private LocalDate dataNascimento;
    private String telefone;
    private boolean status;
    private LocalDate dataCriacao;
    private LocalDate dataModificacao;


    public Leitor() {
        this.dataCriacao = LocalDate.now();
        this.dataModificacao = LocalDate.now();
        this.status = true;
    }

    public void atualizarInformacao(@Valid AtualizacaoLeitorDto data){

        if( data.nome() != null && !data.nome().isEmpty()){
            this.nome = data.nome();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.endereco() != null && !data.endereco().isEmpty()){
            this.endereco = data.endereco();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.email() != null && !data.email().isEmpty()){
            this.email = data.email();
            this.dataModificacao = LocalDate.now();
        }
            
            
        if( data.afiliacao() != null && !data.afiliacao().isEmpty()){
            this.afiliacao = data.afiliacao();
            this.dataModificacao = LocalDate.now();
        }
            
        if( data.telefone() != null && !data.telefone().isEmpty()){
            this.telefone = data.telefone();
            this.dataModificacao = LocalDate.now();
        }
            
        if(data.dataNascimento() != null){
            this.dataNascimento = data.dataNascimento();
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
