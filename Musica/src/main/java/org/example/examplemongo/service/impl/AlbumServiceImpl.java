package org.example.examplemongo.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.examplemongo.config.UserDetailsServiceImpl;
import org.example.examplemongo.domain.entity.Album;
import org.example.examplemongo.domain.entity.User;
import org.example.examplemongo.dto.request.AlbumRequest;
import org.example.examplemongo.dto.response.AlbumResponse;
import org.example.examplemongo.exception.EntityNotFoundException;
import org.example.examplemongo.mapper.AlbumMapper;
import org.example.examplemongo.repository.AlbumRepository;
import org.example.examplemongo.repository.UserRepository;
import org.example.examplemongo.service.AlbumService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AlbumServiceImpl implements AlbumService {
    private  final AlbumRepository albumRepository;
    private final UserRepository userRepository;
    private final AlbumMapper albumMapper;

    @Override
    public AlbumResponse createAlbum(AlbumRequest albumRequest) {
        String userId = UserDetailsServiceImpl.getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(()->new EntityNotFoundException("User not found"));
        log.info(userId);
        Album album= albumMapper.toEntity(albumRequest);
        album.setUsers(user);
        Album savedAlbum= albumRepository.save(album);
        return albumMapper.toResponse(savedAlbum);
    }

    @Override
    public AlbumResponse updateAlbum(AlbumRequest albumRequest, String id) {

        Album existsAlbum = albumRepository.findAlbumById(id)
                .orElseThrow(() -> new EntityNotFoundException("Album not found with id: " + id));

        String userId = UserDetailsServiceImpl.getCurrentUserId();

log.info(existsAlbum.getUsers().getId());
        if (userId.equals(existsAlbum.getUsers().getId())) {
            albumMapper.updateEntity(existsAlbum, albumRequest);
            Album savedAlbum = albumRepository.save(existsAlbum);
            return albumMapper.toResponse(savedAlbum);
        }else {
            throw new EntityNotFoundException("Isn't ur Album: " + id);
        }
    }

    @Override
    public Page<AlbumResponse> getAlbums(Pageable pageable) {
        return albumRepository.findAll(pageable).map(albumMapper::toResponse);
    }

    @Override
    public Page<AlbumResponse> getAlbumsByTitle(String title, Pageable pageable) {
        log.info("Fetching albums with title containing: {}", title);
        Page<Album> albums = albumRepository.findByTitleContainingIgnoreCase(title, pageable);

        if (albums.isEmpty()) {
            log.warn("No albums found with title containing: {}", title);
        } else {
            log.info("Found {} albums with title containing: {}", albums.getTotalElements(), title);
        }

        return albums.map(albumMapper::toResponse);
    }
    @Override
    public void deleteAlbum(String id) {
        albumRepository.deleteById(id);
    }
}
