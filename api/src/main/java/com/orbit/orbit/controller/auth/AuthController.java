package com.orbit.orbit.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.orbit.service.auth.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.orbit.orbit.dtos.auth.AuthDTO;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthDTO authDto) {
        
        try {

            String token = authService.login(authDto);

            return ResponseEntity.status(HttpStatus.OK).body(token);

        } catch (Exception e) {

            if(e.getMessage().contains("Usuário não encontrado")) {

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }

    }

}
