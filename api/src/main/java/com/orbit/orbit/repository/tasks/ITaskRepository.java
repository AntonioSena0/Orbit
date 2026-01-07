package com.orbit.orbit.repository.tasks;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbit.orbit.model.tasks.TaskModel;
import java.util.List;

@Repository
public interface ITaskRepository extends JpaRepository<TaskModel, UUID> {
    
    Optional<TaskModel> findByTitle(String title);
    List<TaskModel> findByUserId(UUID userId);

}
