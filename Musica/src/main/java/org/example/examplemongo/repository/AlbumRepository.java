package org.example.examplemongo.repository;

import org.example.examplemongo.domain.entity.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface AlbumRepository extends MongoRepository<Album, String> {
    Page<Album> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Query("{ '_id': ?0 }")
    Optional<Album> findAlbumById(String id);

}
