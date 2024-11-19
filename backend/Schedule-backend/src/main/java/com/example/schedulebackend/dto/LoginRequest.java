package com.example.schedulebackend.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @NotBlank(message = "Email jest wymagany")
    @Email
    private String email;

    @NotBlank(message = "Haslo jest wymagane")
    private String password;
}
