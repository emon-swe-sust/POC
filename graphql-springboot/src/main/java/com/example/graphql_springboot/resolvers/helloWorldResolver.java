package com.example.graphql_springboot.resolvers;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class helloWorldResolver {
    @QueryMapping("hello")
    public String helloWorld() {
        return "Hello, World!";
    }
}
