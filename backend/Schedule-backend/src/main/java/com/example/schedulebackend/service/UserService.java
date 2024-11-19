package com.example.schedulebackend.service;

import com.example.schedulebackend.dto.RegisterRequest;
import com.example.schedulebackend.model.User;

import java.util.Optional;

public interface UserService {

    User registerUser(User user);

    Optional<User> findByEmail(String email);

    // Dodatkowe metody, np. aktualizacja profilu, zmiana hasła
}