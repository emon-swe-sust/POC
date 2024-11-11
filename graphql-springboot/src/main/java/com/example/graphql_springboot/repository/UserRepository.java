package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.MCQ;
import com.example.graphql_springboot.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

}
