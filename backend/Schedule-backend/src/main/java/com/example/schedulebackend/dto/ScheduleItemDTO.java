package com.example.schedulebackend.dto;

import com.example.schedulebackend.model.ScheduleItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleItemDTO {
    private Long id;
    private String title;
    private String type;
    private String location;
    private String description;
    private String startTime;
    private String endTime;
    private String priority;

    public ScheduleItemDTO(ScheduleItem scheduleItem) {
        this.id = scheduleItem.getId();
        this.title = scheduleItem.getTitle();
        this.type = scheduleItem.getType();
        this.location = scheduleItem.getLocation();
        this.description = scheduleItem.getDescription();
        this.startTime = scheduleItem.getStartTime().toString();
        this.endTime = scheduleItem.getEndTime().toString();
        this.priority = scheduleItem.getPriority();
    }
}


