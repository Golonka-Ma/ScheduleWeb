package com.example.schedulebackend.mapper;

import com.example.schedulebackend.dto.RegisterRequest;
import com.example.schedulebackend.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest registerRequest);
}
