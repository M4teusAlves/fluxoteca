package br.com.fluxoteca.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.fluxoteca.backend.dto.Exception.ErrorDto;
import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class ExeceptionManager {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> Error404(){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler()
    public ResponseEntity<?> validErrors(MethodArgumentNotValidException ex){

        var errors = ex.getFieldErrors();

        return ResponseEntity.badRequest().body(errors.stream().map(ErrorDto::new).toList());

    }

    

    

}
