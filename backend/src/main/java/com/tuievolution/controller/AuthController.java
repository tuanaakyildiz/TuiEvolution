package com.tuievolution.controller;

import com.tuievolution.model.User;
import com.tuievolution.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Frontend portuna göre güncelle
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Bu e-posta zaten kayıtlı!"));
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(401).body(Map.of("message", "E-posta veya şifre hatalı!"));
    }
}