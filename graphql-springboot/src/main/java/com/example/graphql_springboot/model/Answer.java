package com.example.graphql_springboot.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Data
public class Answer {
    @Id
    private String id;
    private String examId;
    private String examineeId;
    private String examineeName;
    private List<String> rightAnswers;
    private List<String> wrongAnswers;
}
