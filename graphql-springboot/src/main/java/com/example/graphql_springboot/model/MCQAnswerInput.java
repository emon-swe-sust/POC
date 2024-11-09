package com.example.graphql_springboot.model;

import lombok.Data;

@Data
public class MCQAnswerInput {
    private String mcqId;
    private String selectedAnswer;
}
