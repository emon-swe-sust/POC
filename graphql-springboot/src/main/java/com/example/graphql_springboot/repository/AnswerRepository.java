package com.example.graphql_springboot.repository;

import com.example.graphql_springboot.model.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer, String> {
    List<Answer> findByExamId(String examId);
    List<Answer> findByExamineeId(String examineeId);
}
