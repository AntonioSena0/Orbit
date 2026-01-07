package com.orbit.orbit.service.tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.orbit.orbit.dtos.tasks.TaskDTO;
import com.orbit.orbit.exceptions.NotAuthorized;
import com.orbit.orbit.exceptions.tasks.TaskAlreadyExistsException;
import com.orbit.orbit.model.tasks.TaskModel;
import com.orbit.orbit.repository.tasks.ITaskRepository;
import com.orbit.orbit.service.users.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService implements ITaskService{

    private final UserService userService;
    
    private final ITaskRepository taskRepository;

    @Override
    public List<TaskModel> findAll(){
        return this.taskRepository.findAll();
    }

    @Override
    public TaskModel findById(UUID id){
        return this.taskRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    @Override
    public List<TaskModel> findByUserId(UUID userId){
        userService.findById(userId);
        return this.taskRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public TaskModel create(TaskDTO taskDto){

        var user = userService.findById(taskDto.userId());
        var existing = this.taskRepository.findByTitle(taskDto.title());

        if(existing.isPresent() && existing.get().getUser().getId().equals(user.getId())){
            throw new TaskAlreadyExistsException("A tarefa já existe em sua órbita");
        }

        TaskModel newTask = new TaskModel();

        newTask.setTitle(taskDto.title());
        newTask.setDescription(taskDto.description());
        newTask.setPriority(taskDto.priority());
        newTask.setStartAt(taskDto.startAt());
        newTask.setEndAt(taskDto.endAt());

        newTask.setUser(user);

        return this.taskRepository.save(newTask);

    }

    @Override
    @Transactional
    public TaskModel update(UUID id, TaskDTO taskDto){
        
        TaskModel existingTask = this.findById(id);

        if(!existingTask.getUser().getId().equals(taskDto.userId())){
            throw new NotAuthorized("Acesso negado: você não é o comandante desta tarefa");
        }

        if(taskDto.title() != null && !taskDto.title().equals(existingTask.getTitle())){

            var existing = this.taskRepository.findByTitle(taskDto.title());

            if(existing.isPresent() && existing.get().getUser().getId().equals(taskDto.userId())){
                throw new TaskAlreadyExistsException("Essa tarefa já existe em sua órbita");
            }
            existingTask.setTitle(taskDto.title());
        }

        if(taskDto.description() != null){
            existingTask.setDescription(taskDto.description());
        }

        if(taskDto.startAt() != null){
            existingTask.setStartAt(taskDto.startAt());
        }

        if(taskDto.endAt() != null){
            existingTask.setEndAt(taskDto.endAt());
        }

        if(taskDto.priority() != null){
            existingTask.setPriority(taskDto.priority());
        }

        return this.taskRepository.save(existingTask);

    }

    @Override
    @Transactional
    public void delete(UUID id, UUID userId){
        var task = this.findById(id);

        if(!task.getUser().getId().equals(userId)){
            throw new NotAuthorized("Você não tem permissão para modificar essa tarefa");
        }

        this.taskRepository.delete(task);
        this.taskRepository.flush();
    }

    @Override
    @Transactional
    public TaskModel toggle(UUID id, UUID userId) {

        TaskModel task = this.findById(id);

        if (!task.getUser().getId().equals(userId)) {
            throw new NotAuthorized("Acesso negado: Você não é o comandante desta unidade");
        }

        task.setCompleted(!task.isCompleted());
        
        return this.taskRepository.save(task);

    }

}
