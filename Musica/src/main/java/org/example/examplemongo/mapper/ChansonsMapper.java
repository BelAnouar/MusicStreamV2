package org.example.examplemongo.mapper;


import org.example.examplemongo.domain.entity.Chanson;
import org.example.examplemongo.domain.entity.User;
import org.example.examplemongo.dto.request.ChansonsRequest;
import org.example.examplemongo.dto.request.UserResquest;
import org.example.examplemongo.dto.response.ChansonsResponse;
import org.example.examplemongo.dto.response.UserResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ChansonsMapper {


    Chanson toEntity(ChansonsRequest chansonsRequest);

    ChansonsResponse toResponse(Chanson chanson);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget Chanson chanson, ChansonsRequest chansonsRequest);

}
