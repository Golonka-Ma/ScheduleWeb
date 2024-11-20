package com.example.schedulebackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.DayOfWeek;
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

    @NotNull(message = "Day of week is mandatory")
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @NotNull(message = "Start time is mandatory")
    private LocalTime startTime;

    @NotNull(message = "End time is mandatory")
    private LocalTime endTime;

    // Relacja z User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
