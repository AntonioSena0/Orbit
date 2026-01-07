package com.orbit.orbit.service.users;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;

import com.orbit.orbit.dtos.users.UserDTO;
import com.orbit.orbit.model.users.UserModel;

public interface IUserService {
    List<UserModel> findAll();
    UserModel findById(UUID id);
    String create(UserDTO userDTO);
    String update(UUID id, UserDTO userDTO, Authentication authentication);
    void delete(UUID id, Authentication authentication);
}
