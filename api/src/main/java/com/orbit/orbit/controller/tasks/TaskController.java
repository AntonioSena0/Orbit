package com.orbit.orbit.controller.tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.orbit.dtos.tasks.TaskDTO;
import com.orbit.orbit.model.tasks.TaskModel;
import com.orbit.orbit.service.tasks.ITaskService;

import lombok.RequiredArgsConstructor;




@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
    
    private final ITaskService taskService;

    @GetMapping("/")
    public ResponseEntity<?> get() {
    
        try {
            List<TaskModel> tasks = taskService.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        
        try {
            TaskModel task = taskService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro:" + e.getMessage());
        }

    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUserId(@PathVariable UUID userId) {
        
        try {
            List<TaskModel> tasks = taskService.findByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro:" + e.getMessage());
        }

    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody TaskDTO taskDto) {

        try{
            TaskModel createdTask = taskService.create(taskDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + e.getMessage());
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody TaskDTO taskDto) {
        
        try {
            TaskModel updatedTask = taskService.update(id, taskDto);
            return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
        } catch (Exception e) {
            if(e.getMessage().contains("não encontrada")){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
            }
            if(e.getMessage().contains("permissão para alterar")){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Erro: " + e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + e.getMessage());
        }

    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggle(@PathVariable UUID id, @RequestHeader("userId") UUID userId) {
    try {
        TaskModel updatedTask = taskService.toggle(id, userId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
    } catch (Exception e) {
        if (e.getMessage().contains("Acesso negado")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Erro: " + e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, @RequestHeader UUID userId){

        try {
            taskService.delete(id, userId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            if(e.getMessage().contains("Acesso negado")){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Erro: " + e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }

    }

}