package com.orbit.orbit.dtos.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserDTO(

    @NotBlank(message="O nome de usuário é obrigatório")
    @Size(min= 3, max = 30, message="Nome de usuário deve ter entre 3 e 30 caracteres")
    String usernameu,

    @NotBlank(message="O email é obrigatório")
    @Email(message="Formato de email inválido")
    String email,

    @NotBlank(message="A senha é obrigatória")
    @Size(min=8, message="A senha deve ter mais de 8 caracteres")
    String password

) {}
