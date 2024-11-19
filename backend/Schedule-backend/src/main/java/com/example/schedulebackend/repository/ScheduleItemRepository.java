package com.example.schedulebackend.repository;

import com.example.schedulebackend.model.ScheduleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduleItemRepository extends JpaRepository<ScheduleItem, Long> {
    List<ScheduleItem> findByUserId(Long userId);
}
