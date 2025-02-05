package org.example.examplemongo.mapper;


import org.example.examplemongo.domain.entity.User;
import org.example.examplemongo.dto.request.UserResquest;
import org.example.examplemongo.dto.response.UserResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {


    User  toEntity(UserResquest userResquest);

    UserResponse toResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget  User user, UserResquest userResquest);
}
