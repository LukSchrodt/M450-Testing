package com.example.demo.domain.myListEntry.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.myListEntry.MyListEntry;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserRegisterDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MyListEntryMapper extends ExtendedMapper<MyListEntry, MyListEntryDTO> {
}