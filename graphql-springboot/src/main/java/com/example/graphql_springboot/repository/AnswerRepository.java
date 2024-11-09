package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnswerRepository extends MongoRepository<Answer, String> {
}
