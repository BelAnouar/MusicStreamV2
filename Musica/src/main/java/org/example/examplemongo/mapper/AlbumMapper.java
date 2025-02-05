package org.example.examplemongo.mapper;


import org.example.examplemongo.domain.entity.Album;
import org.example.examplemongo.domain.entity.User;
import org.example.examplemongo.dto.request.AlbumRequest;
import org.example.examplemongo.dto.request.UserResquest;
import org.example.examplemongo.dto.response.AlbumResponse;
import org.example.examplemongo.dto.response.UserResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AlbumMapper {

    Album toEntity(AlbumRequest albumRequest);

    AlbumResponse toResponse(Album album);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget Album album, AlbumRequest albumRequest);
}
