package com.example.schedulebackend.controller;

import com.example.schedulebackend.model.ScheduleItem;
import com.example.schedulebackend.model.User;
import com.example.schedulebackend.service.ScheduleService;
import com.example.schedulebackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService; // Używamy interfejsu
    private final UserService userService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, UserService userService) {
        this.scheduleService = scheduleService;
        this.userService = userService;
    }

    @GetMapping
    public List<ScheduleItem> getSchedule(@AuthenticationPrincipal User user) {
        return scheduleService.getScheduleForUser(user.getId());
    }

    @PostMapping
    public ScheduleItem addScheduleItem(@AuthenticationPrincipal User user, @Valid @RequestBody ScheduleItem scheduleItem) {
        scheduleItem.setUser(user);
        return scheduleService.addScheduleItem(scheduleItem);
    }

    @DeleteMapping("/{id}")
    public void deleteScheduleItem(@PathVariable Long id) {
        scheduleService.deleteScheduleItem(id);
    }

    // Dodatkowe metody PUT/PATCH do aktualizacji
}
