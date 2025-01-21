package com.example.schedulebackend.controller;

import com.example.schedulebackend.model.User;
import com.example.schedulebackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Zwraca dane zalogowanego użytkownika na podstawie emaila w Tokenie JWT.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(401).body("Brak autoryzacji (niepoprawny token).");
        }

        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Użytkownik nie został znaleziony.");
        }

        User user = userOpt.get();
        return ResponseEntity.ok(user);
    }

    /**
     * Aktualizuje dane zalogowanego użytkownika (imię, nazwisko, email lub hasło).
     */
    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(HttpServletRequest request, @RequestBody User updatedData) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(401).body("Brak autoryzacji (niepoprawny token).");
        }

        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Użytkownik nie został znaleziony.");
        }

        User user = userOpt.get();

        if (updatedData.getFirstName() != null) {
            user.setFirstName(updatedData.getFirstName());
        }
        if (updatedData.getLastName() != null) {
            user.setLastName(updatedData.getLastName());
        }
        if (updatedData.getPassword() != null && !updatedData.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedData.getPassword()));
        }

        userService.registerUser(user);
        return ResponseEntity.ok("Dane użytkownika zostały zaktualizowane.");
    }
}
