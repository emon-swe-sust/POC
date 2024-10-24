package com.example.graphql_springboot.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("mcqs")
@Data
public class MCQ {
    @Id
    private String id;
    private String question;
    private List<String> options;
    private String examId;
}
