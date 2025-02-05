package org.example.examplemongo.repository;

import org.example.examplemongo.domain.entity.Album;
import org.example.examplemongo.domain.entity.Chanson;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ChansonsRepository extends MongoRepository<Chanson, String> {
    Optional<Chanson> findByTitle(String title);
    @Query("{ '_id': ?0 }")
    Optional<Chanson> findChansonById(String id);
}
