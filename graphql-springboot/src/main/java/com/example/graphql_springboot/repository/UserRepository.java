package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
