package com.example.graphql_springboot.resolvers;


import com.example.graphql_springboot.model.Person;
import com.example.graphql_springboot.repository.PersonRepository;
import com.example.graphql_springboot.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

@Controller
public class AuthResolver {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @MutationMapping
    public String registerUser(@Argument String username, @Argument String password) {
        Person person = new Person();
        person.setUsername(username);
        person.setPassword(passwordEncoder.encode(password));
        personRepository.save(person);
        return "User registered successfully";
    }

    @MutationMapping
    public String loginUser(@Argument String username, @Argument String password) {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            return jwtUtil.generateToken(username);
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials");
        }
    }

}

