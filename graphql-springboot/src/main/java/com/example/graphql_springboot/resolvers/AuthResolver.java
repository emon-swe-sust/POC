package com.example.graphql_springboot.resolvers;


import com.example.graphql_springboot.model.User;
import com.example.graphql_springboot.repository.UserRepository;
//import com.example.graphql_springboot.service.AuthService;
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
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @MutationMapping
    public User registerUser(@Argument String username, @Argument String email, @Argument String role, @Argument String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setEmail(email);
        userRepository.save(user);
        return user;
    }

    @MutationMapping
    public String loginUser(@Argument String username, @Argument String password) {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            User user = userRepository.findByUsername(username);
            String token = jwtUtil.generateToken(username, user.getRole(), user.getId());

            return token;
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials");
        }
    }

}

