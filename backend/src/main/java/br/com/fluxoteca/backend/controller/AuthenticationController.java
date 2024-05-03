package br.com.fluxoteca.backend.controller;

import br.com.fluxoteca.backend.model.Usuario;
import br.com.fluxoteca.backend.dto.LoginUserDto;
// import br.com.fluxoteca.backend.dto.RegisterUserDto;
import br.com.fluxoteca.backend.dto.Usuario.CriacaoUsuarioDto;
import br.com.fluxoteca.backend.responses.LoginResponse;
import br.com.fluxoteca.backend.services.AuthenticationService;
import br.com.fluxoteca.backend.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Usuario> register(@RequestBody CriacaoUsuarioDto registerUserDto) {
        Usuario registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        Usuario authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
