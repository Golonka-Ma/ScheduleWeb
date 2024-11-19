package com.example.schedulebackend.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class RegisterRequest {

    @NotBlank(message = "Imie jest wymagane")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "Nazwisko jest wymagane")
    @Size(max = 50)
    private String lastName;

    @NotBlank(message = "Email jest wymagany")
    @Email
    private String email;

    @NotBlank(message = "Haslo jest wymagane")
    @Size(min = 6)
    private String password;
}
