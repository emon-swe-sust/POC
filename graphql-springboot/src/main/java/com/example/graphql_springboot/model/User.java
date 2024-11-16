package com.example.graphql_springboot.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class User {
    @Id
    private String id;
    private String fullName;
    private String department;
    private String regNo;
    private String username;
    private String email;
    private String password;
    private String role;
}
