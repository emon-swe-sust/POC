package com.example.graphql_springboot.resolvers;

import com.example.graphql_springboot.model.User;
import com.example.graphql_springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class UserMutationResolver {

    @Autowired
    public UserRepository userRepository;

    @MutationMapping
    public User addUser(@Argument  String name, @Argument String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);

        return userRepository.save(user);
    }
}
