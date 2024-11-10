package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepository extends MongoRepository<Person, String> {
}
