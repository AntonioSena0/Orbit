package com.orbit.orbit.service.users;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.orbit.orbit.dtos.users.UserDTO;
import com.orbit.orbit.exceptions.NotAuthorized;
import com.orbit.orbit.exceptions.users.UserAlreadyExistsException;
import com.orbit.orbit.model.users.UserModel;
import com.orbit.orbit.repository.users.IUserRepository;
import com.orbit.orbit.service.auth.JwtService;

import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    
    private final IUserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public List<UserModel> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public UserModel findById(UUID id) {
        return this.userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    }

    @Override
    @Transactional
    public String create(UserDTO userDto) {

        if(this.userRepository.findByUsernameu(userDto.usernameu()).isPresent()){
            throw new RuntimeException("Nome de usuário já existe");
        }

        if(this.userRepository.findByEmail(userDto.email()).isPresent()){
            throw new UserAlreadyExistsException("E-mail já cadastrado");
        }

        var hashedPassword = BCrypt.withDefaults().hashToString(12, userDto.password().toCharArray());

        UserModel newUser = new UserModel();

        newUser.setUsernameu(userDto.usernameu());
        newUser.setEmail(userDto.email());
        newUser.setPassword(hashedPassword);
        
        this.userRepository.save(newUser);

        String token = jwtService.generateToken(newUser);

        return token;

    }

    @Override
    @Transactional
    public String update(UUID id, UserDTO userDto, Authentication authentication) {

        UserModel currentUser = (UserModel) authentication.getPrincipal();

        if(!currentUser.getId().equals(id)){

            throw new NotAuthorized("Você não tem autorização para atualizar essa conta");

        }

        UserModel existingUser = this.findById(id);

        if(userDto.usernameu() != null && !userDto.usernameu().isBlank() && !userDto.usernameu().equals(existingUser.getUsernameu())){
            if (this.userRepository.findByUsernameu(userDto.usernameu()).isPresent()){
                throw new UserAlreadyExistsException("Nome de usuário já cadastrado");
            }
            existingUser.setUsernameu(userDto.usernameu());
        }
        if(userDto.email() != null && !userDto.email().isBlank() && !userDto.email().equals(existingUser.getEmail())){

            if (this.userRepository.findByEmail(userDto.email()).isPresent()){
                throw new UserAlreadyExistsException("Email já cadastrado");
            }
            existingUser.setEmail(userDto.email());
        }
        if(userDto.password() != null && !userDto.password().isBlank()){
            var hashedPassword = BCrypt.withDefaults().hashToString(12, userDto.password().toCharArray());
            existingUser.setPassword(hashedPassword);
        }

        this.userRepository.save(existingUser);

        String token = jwtService.generateToken(existingUser);

        return token;
    }

    @Override
    @Transactional
    public void delete(UUID id, Authentication authentication){
        var existingUser = this.findById(id);

        UserModel currentUser = (UserModel) authentication.getPrincipal();

        if(!currentUser.getId().equals(id)){

            throw new NotAuthorized("Você não tem autorização para deletar essa conta");

        }

        this.userRepository.delete(existingUser);
    }

}