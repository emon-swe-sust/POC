package com.example.graphql_springboot.utils;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "c2VjcmV0S2V5TmFtZT1qZGVxMndhZGlyMXtMdk1TbmxWcmFud1tkLqA9wz0Cg==";

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Boolean validateToken(String token, String username) {
        try {
            return username.equals(extractUsername(token)) && !isTokenExpired(token);
        } catch (ExpiredJwtException | MalformedJwtException | SignatureException e) {
            return false;
        }    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) // Use the same secret key as when generating the token
                    .build()
                    .parseClaimsJwt(token) // Correct method for parsing JWT
                    .getBody(); // Extract the claims
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            // Debugging the token string
            System.out.println("Error decoding JWT: " + e.getMessage());
            throw new RuntimeException("JWT decoding error", e);
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
