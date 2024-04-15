// Paket dan impor
package com.hotel.until;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Kunci rahasia untuk menandatangani token JWT
    public static final String SECRET = "413F4428472B4B6250655368566D5970337336763979244226452948404D6351";

    // Metode untuk membuat token JWT
    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // Token berlaku selama 30 menit
                .signWith(SignatureAlgorithm.HS256, getSignKey())
                .compact();
    }

    // Mendapatkan kunci penandatanganan untuk token JWT
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Metode untuk membuat token JWT dengan memberikan username
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    // Metode untuk mengekstrak semua klaim dari token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignKey())
                .parseClaimsJws(token)
                .getBody();
    }

    // Metode untuk mengekstrak klaim tertentu dari token
    private <T> T extraClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    // Metode untuk mengekstrak tanggal kedaluwarsa token
    private Date extractExpiration(String token) {
        return extraClaim(token, Claims::getExpiration);
    }

    // Metode untuk mengekstrak nama pengguna dari token
    public String extractUsername(String token) {
        return extraClaim(token, Claims::getSubject);
    }

    // Memeriksa apakah token sudah kedaluwarsa
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Memvalidasi token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
