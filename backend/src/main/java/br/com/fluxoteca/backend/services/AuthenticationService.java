package br.com.fluxoteca.backend.services;

import br.com.fluxoteca.backend.dto.LoginUserDto;
// import br.com.fluxoteca.backend.dto.RegisterUserDto;
import br.com.fluxoteca.backend.dto.Usuario.CriacaoUsuarioDto;                                                                                                                                                                                                                                                                      
import br.com.fluxoteca.backend.model.Usuario;
import br.com.fluxoteca.backend.repository.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UsuarioRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UsuarioRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario signup(CriacaoUsuarioDto input) {
        Usuario user = new Usuario();
        user.setNome(input.nome());
        user.setEmail(input.email());
        user.setSenha(passwordEncoder.encode(input.senha()));

        return userRepository.save(user);
    }

    public Usuario authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getSenha()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}