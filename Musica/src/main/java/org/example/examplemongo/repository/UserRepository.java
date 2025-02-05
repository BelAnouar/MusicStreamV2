package org.example.examplemongo.repository;

import org.example.examplemongo.domain.entity.Chanson;
import org.example.examplemongo.domain.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByLogin(String login);
    @Query("{ '_id': ?0 }")
    Optional<User> findUserById(String id);
}
