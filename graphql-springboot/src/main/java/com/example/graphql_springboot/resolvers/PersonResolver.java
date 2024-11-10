package com.example.graphql_springboot.resolvers;

import com.example.graphql_springboot.model.Person;
import com.example.graphql_springboot.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class PersonResolver {

    @Autowired
    public PersonRepository userRepository;

    @QueryMapping
    public Person getUserById(String id) throws Exception {
        return userRepository.
                findById(id)
                .orElseThrow(() -> new Exception("User not found with id: " + id));
    }

    @QueryMapping
    public List<Person> getAllUsers() {
        return userRepository.findAll();
    }

    @MutationMapping
    public Person addUser(@Argument  String name, @Argument String email) {
        Person person = new Person();
        person.setUsername(name);
        person.setEmail(email);

        return userRepository.save(person);
    }
}
