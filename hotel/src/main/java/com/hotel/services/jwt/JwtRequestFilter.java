// Paket dan impor
package com.hotel.services.jwt;


import com.hotel.until.JwtUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Anotasi @Component menunjukkan bahwa ini adalah komponen Spring
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    // Dependency injection untuk layanan UserDetailsService
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // Dependency injection untuk utilitas JWT
    @Autowired
    private JwtUtil jwtUtil;

    // Metode untuk memfilter permintaan HTTP
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Mendapatkan header otorisasi dari permintaan HTTP
        String authHeader = request.getHeader("Authorization");

        // Memeriksa apakah header otorisasi dimulai dengan "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Mengekstrak token JWT dari header otorisasi
            String jwtToken = authHeader.substring(7);

            try {
                // Mendapatkan username dari token JWT
                String username = jwtUtil.extractUsername(jwtToken);

                // Memuat detail pengguna berdasarkan username
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Memvalidasi token JWT
                if (jwtUtil.validateToken(jwtToken, userDetails)) {
                    // Jika valid, buat token otentikasi
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    // Menetapkan detail permintaan HTTP ke token otentikasi
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // Menetapkan token otentikasi ke SecurityContextHolder
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (JwtException e) {
                // Tangani kesalahan terkait token JWT
                logger.error("Error processing JWT token: " + e.getMessage());
            } catch (UsernameNotFoundException e) {
                // Tangani kesalahan jika username tidak ditemukan
                logger.error("Username not found: " + e.getMessage());
            }
        }

        // Lanjutkan proses filter permintaan
        filterChain.doFilter(request, response);
    }
}
