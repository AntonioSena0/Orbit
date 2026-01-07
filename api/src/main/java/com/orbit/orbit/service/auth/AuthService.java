package com.orbit.orbit.service.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.orbit.orbit.dtos.auth.AuthDTO;
import com.orbit.orbit.exceptions.users.IncorrectPassword;
import com.orbit.orbit.exceptions.users.UserNotFoundException;
import com.orbit.orbit.repository.users.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public String login(AuthDTO authDto){

        var user = userRepository.findByEmail(authDto.emailAuth())
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        if(!passwordEncoder.matches(authDto.passwordAuth(), user.getPassword())) {

            throw new IncorrectPassword("Senha incorreta");

        }

        return jwtService.generateToken(user);

    }

}
