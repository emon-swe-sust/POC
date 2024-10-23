package com.example.graphql_springboot.resolvers;

import com.example.graphql_springboot.model.User;
import com.example.graphql_springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserQueryResolver {

    @Autowired
    private UserRepository userRepository;

    @QueryMapping
    public User getUserById(String id) throws Exception {
        return userRepository.
                findById(id)
                .orElseThrow(() -> new Exception("User not found with id: " + id));
    }

    @QueryMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
