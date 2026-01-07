package com.orbit.orbit.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record  AuthDTO(
    @NotBlank(message="O email é obrigatório")
    @Email(message= "Formato de email incorreto")
    String emailAuth,

    @NotBlank(message="A senha é obrigatória")
    String passwordAuth
) {}
