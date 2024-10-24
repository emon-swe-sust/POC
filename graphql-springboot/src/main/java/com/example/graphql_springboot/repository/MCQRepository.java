package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.MCQ;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MCQRepository extends MongoRepository<MCQ, String> {
}
