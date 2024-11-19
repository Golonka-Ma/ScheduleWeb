package com.example.schedulebackend.service;

import com.example.schedulebackend.model.ScheduleItem;
import com.example.schedulebackend.repository.ScheduleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleItemRepository scheduleItemRepository;

    @Autowired
    public ScheduleServiceImpl(ScheduleItemRepository scheduleItemRepository) {
        this.scheduleItemRepository = scheduleItemRepository;
    }

    @Override
    public List<ScheduleItem> getScheduleForUser(Long userId) {
        return scheduleItemRepository.findByUserId(userId);
    }

    @Override
    public ScheduleItem addScheduleItem(ScheduleItem scheduleItem) {
        return scheduleItemRepository.save(scheduleItem);
    }

    @Override
    public void deleteScheduleItem(Long id) {
        scheduleItemRepository.deleteById(id);
    }

    // Implementacja dodatkowych metod
}
