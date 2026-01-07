package com.orbit.orbit.dtos.tasks;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskDTO(

    @NotBlank(message="O título da tarefa é obrigatório")
    String title,

    String description,

    @NotBlank(message="A prioridade é obrigatória (HIGH, MEDIUM, LOW)")
    String priority,
    
    Boolean isCompleted,

    LocalDateTime startAt,

    @FutureOrPresent(message = "A data final não pode ser menor que a data atual")
    LocalDateTime endAt,

    @NotNull(message= "O ID do usuário é obrigatório para criar a tarefa")
    UUID userId

) {}