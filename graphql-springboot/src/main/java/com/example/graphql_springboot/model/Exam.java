package com.example.graphql_springboot.model;

import lombok.Data;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Exam {
    @Id
    private String id;
    private String title;
    private String description;
    private String author;
    private String authorId;
}
