package br.com.fluxoteca.backend.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import br.com.fluxoteca.backend.model.Autor;
import br.com.fluxoteca.backend.model.Backup;
import br.com.fluxoteca.backend.model.Categoria;
import br.com.fluxoteca.backend.model.Emprestimo;
import br.com.fluxoteca.backend.model.Exemplar;
import br.com.fluxoteca.backend.model.Leitor;
import br.com.fluxoteca.backend.model.Livro;
import br.com.fluxoteca.backend.model.Usuario;
import br.com.fluxoteca.backend.repository.AutorRepository;
import br.com.fluxoteca.backend.repository.CategoriaRepository;
import br.com.fluxoteca.backend.repository.EmprestimoRepository;
import br.com.fluxoteca.backend.repository.ExemplarRepository;
import br.com.fluxoteca.backend.repository.LeitorRepository;
import br.com.fluxoteca.backend.repository.LivroRepository;
import br.com.fluxoteca.backend.repository.UsuarioRepository;

@Service
public class BackupService {

    @Value("${localization}")
    private String localization;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private LeitorRepository leitorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    public void gerarBackupJson() throws IOException {
        List<Livro> livros = livroRepository.findAll();

        List<Exemplar> exemplares = exemplarRepository.findAll();

        List<Autor> autores = autorRepository.findAll();

        List<Categoria> categorias = categoriaRepository.findAll();

        List<Leitor> leitores = leitorRepository.findAll();

        List<Usuario> usuarios = usuarioRepository.findAll();

        List<Emprestimo> emprestimos = emprestimoRepository.findAll();


        Backup backup = new Backup(livros, exemplares, autores, categorias, leitores, usuarios, emprestimos);

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

        String json = mapper.writeValueAsString(backup);

        String fileName = "backup_livros_"+ LocalDate.now() + ".json";
        Path path = Paths.get(localization, fileName);
        
        Files.createDirectories(path.getParent()); // Cria a pasta backups se não existir
        Files.write(path, json.getBytes(StandardCharsets.UTF_8));
    }
    
}
