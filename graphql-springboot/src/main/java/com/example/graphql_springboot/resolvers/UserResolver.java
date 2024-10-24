package com.example.graphql_springboot.resolvers;

import com.example.graphql_springboot.model.User;
import com.example.graphql_springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserResolver {

    @Autowired
    public UserRepository userRepository;

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

    @MutationMapping
    public User addUser(@Argument  String name, @Argument String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);

        return userRepository.save(user);
    }
}
