package com.orbit.orbit.repository.users;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbit.orbit.model.users.UserModel;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, UUID>{
    
    Optional<UserModel> findByUsernameu(String usernameu);

    Optional<UserModel> findByEmail(String email);

}