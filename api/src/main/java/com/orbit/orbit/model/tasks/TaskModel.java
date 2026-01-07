package com.orbit.orbit.model.tasks;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.orbit.orbit.model.users.UserModel;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name="tb_tasks")
public class TaskModel {
    
    @Id
    @GeneratedValue(generator= "UUID")
    private UUID id;

    private String title;

    private String description;

    private LocalDateTime startAt;

    private LocalDateTime endAt;

    private String priority;

    private boolean isCompleted = false;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable=false)
    private UserModel user;
    
    @CreationTimestamp
    private LocalDateTime createdAt;

}
