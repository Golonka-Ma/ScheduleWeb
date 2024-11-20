package com.example.schedulebackend.mapper;

import com.example.schedulebackend.dto.ScheduleItemDTO;
import com.example.schedulebackend.model.ScheduleItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ScheduleItemMapper {
    ScheduleItemDTO toDTO(ScheduleItem scheduleItem);
    ScheduleItem toEntity(ScheduleItemDTO scheduleItemDTO);
}

