package com.example.schedulebackend.service;

import com.example.schedulebackend.model.ScheduleItem;

import java.util.List;
import java.util.Optional;

public interface ScheduleService {

    List<ScheduleItem> getScheduleForUser(Long userId);

    ScheduleItem addScheduleItem(ScheduleItem scheduleItem);

    void deleteScheduleItem(Long id);
    Optional<ScheduleItem> findById(Long id);
}
