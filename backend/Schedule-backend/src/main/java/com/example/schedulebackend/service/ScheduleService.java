package com.example.schedulebackend.service;

import com.example.schedulebackend.model.ScheduleItem;

import java.util.List;

public interface ScheduleService {

    List<ScheduleItem> getScheduleForUser(Long userId);

    ScheduleItem addScheduleItem(ScheduleItem scheduleItem);

    void deleteScheduleItem(Long id);

    // Dodatkowe metody, np. aktualizacja pozycji
}
