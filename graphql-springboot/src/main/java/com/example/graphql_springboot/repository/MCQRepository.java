package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.MCQ;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MCQRepository extends MongoRepository<MCQ, String> {
    List<MCQ> findByExamId(String examId);
}
