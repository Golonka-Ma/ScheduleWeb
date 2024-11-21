package com.example.schedulebackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "schedule_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 100)
    private String title;

    @NotBlank(message = "Type is mandatory")
    @Size(max = 50)
    private String type;

    @NotBlank(message = "Location is mandatory")
    @Size(max = 100)
    private String location;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotNull(message = "Start time is mandatory")
    private LocalDateTime startTime;

    @NotNull(message = "End time is mandatory")
    private LocalDateTime endTime;

    @NotBlank(message = "Priority is mandatory")
    @Size(max = 20)
    private String priority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
