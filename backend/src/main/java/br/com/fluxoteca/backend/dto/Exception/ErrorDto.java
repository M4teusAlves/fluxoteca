package br.com.fluxoteca.backend.dto.Exception;

import org.springframework.validation.FieldError;

public record ErrorDto(String field, String message) {
    public ErrorDto(FieldError error){
        this(error.getField(), error.getDefaultMessage());
    }
}
