package br.com.fluxoteca.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity.csrf(csrf -> csrf.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authorizeHttpRequests(requests -> requests
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()
                .requestMatchers(HttpMethod.GET, "/usuarios").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/usuarios").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/usuarios").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/livros").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/livros").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/livros").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/exemplares").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/exemplares").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/exemplares").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/categorias").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/categorias").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/categorias").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/autores").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/autores").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/autores").hasRole("ADMIN")
                .anyRequest().authenticated()).addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{

        return configuration.getAuthenticationManager();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/swagger-ui/**", "/api-docs/**", "/documentation");
    }

}
