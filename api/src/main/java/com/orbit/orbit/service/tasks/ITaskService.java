package com.orbit.orbit.service.tasks;

import java.util.List;
import java.util.UUID;

import com.orbit.orbit.dtos.tasks.TaskDTO;
import com.orbit.orbit.model.tasks.TaskModel;

public interface ITaskService {
    List<TaskModel> findAll();
    TaskModel findById(UUID id);
    List<TaskModel> findByUserId(UUID id);
    TaskModel create(TaskDTO taskDto);
    TaskModel update(UUID id, TaskDTO taskDto);
    void delete(UUID id, UUID userId);
    TaskModel toggle(UUID id, UUID userId);
}
