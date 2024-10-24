package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.Exam;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExamRepository extends MongoRepository<Exam, String> {
    List<Exam> findByAuthorId(String authorId);
}
