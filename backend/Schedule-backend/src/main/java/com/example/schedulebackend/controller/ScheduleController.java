package com.example.schedulebackend.controller;

import com.example.schedulebackend.dto.ScheduleItemDTO;
import com.example.schedulebackend.model.ScheduleItem;
import com.example.schedulebackend.model.User;
import com.example.schedulebackend.service.ScheduleService;
import com.example.schedulebackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final UserService userService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, UserService userService) {
        this.scheduleService = scheduleService;
        this.userService = userService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<ScheduleItemDTO>> getSchedule(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found"));

        List<ScheduleItem> scheduleItems = scheduleService.getScheduleForUser(user.getId());

        List<ScheduleItemDTO> scheduleItemDTOs = scheduleItems.stream()
                .map(ScheduleItemDTO::new)
                .toList();

        return ResponseEntity.ok(scheduleItemDTOs);
    }



    @PostMapping("/add")
    public ResponseEntity<String> addScheduleItem(HttpServletRequest request, @RequestBody ScheduleItem scheduleItem) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User not authenticated");
        }

        User user = userService.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found"));
        scheduleItem.setUser(user);
        scheduleService.addScheduleItem(scheduleItem);
        return ResponseEntity.status(HttpStatus.CREATED).body("Schedule item added successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteScheduleItem(@PathVariable Long id) {
        try {
            scheduleService.deleteScheduleItem(id);
            return ResponseEntity.ok("Schedule item deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Non existing task");
        }
    }
}
