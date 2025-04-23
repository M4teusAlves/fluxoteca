package br.com.fluxoteca.backend.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Backup {
    private List<Livro> livros;
    private List<Exemplar> exemplares;
    private List<Autor> autores;
    private List<Categoria> categorias;
    private List<Leitor> leitores;
    private List<Usuario> usuarios;
    private List<Emprestimo> emprestimos;

}
