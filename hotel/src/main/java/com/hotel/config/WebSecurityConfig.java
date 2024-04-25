package com.hotel.config;

import com.hotel.services.jwt.JwtRequestFilter;
import com.hotel.until.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    private JwtRequestFilter requestFilter;

    @Autowired
    private JwtUtil jwtUtil;

    // Metode konfigurasi keamanan web menggunakan Spring Security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Menonaktifkan perlindungan CSRF (Cross-Site Request Forgery)
        return http.csrf().disable()
                // Mengatur perizinan akses untuk berbagai endpoint
                .authorizeRequests()
                // Mengizinkan akses bebas ke endpoint-endpoint tertentu
                .requestMatchers("/authenticate", "/company/sign-up", "/client/sign-up", "/ads", "/search/{service}").permitAll()
                // Mengizinkan akses ke semua endpoint di bawah /api tanpa otentikasi
                .requestMatchers("/api/**").permitAll()


                //AD role company
                // Mengizinkan akses POST ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.POST, "/api/company/ad/**").permitAll()
                // Mengizinkan akses GET ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/company/ads/**").permitAll()
                // Mengizinkan akses PUT ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.PUT, "/api/company/ad/**").permitAll()
                // Mengizinkan akses GET ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/company/ad/**").permitAll()
                // Mengizinkan akses DELETE ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.DELETE, "/api/company/ad/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/company/booking/{bookingId}").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/company/search/{name}").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/company/contacts/**").permitAll()



                //AD role client
                // Mengizinkan akses GET ke endpoint /api/client/ads/** tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/client/ads/**").permitAll()
                // Mengizinkan akses PUT ke endpoint /api/client/ad/** tanpa otentikasi
                .requestMatchers(HttpMethod.PUT, "/api/client/ad/**").permitAll()
                // Mengizinkan akses GET ke endpoint /api/client/ad/** tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/client/ad/**").permitAll()
                // Mengizinkan akses DELETE ke endpoint /api/client/ad/** tanpa otentikasi
                .requestMatchers(HttpMethod.DELETE, "/api/client/ad/**").permitAll()

                // Mengizinkan akses GET ke endpoint /api/client/my-bookings/{userId} tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/client/my-bookings/{userId}").permitAll()
                // Mengizinkan akses PUT ke endpoint /api/company/booking/{bookingId}/{status} tanpa otentikasi
                .requestMatchers(HttpMethod.PUT, "/api/company/booking/{bookingId}/{status}").permitAll()
                // Mengizinkan akses GET ke endpoint /api/company/booking/{companyId} tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/company/booking/{companyId}").permitAll()


                // artikel role company
                // Mengizinkan akses POST ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.POST, "/api/company/article/**").permitAll()
                // Mengizinkan akses GET ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/company/articles/**").permitAll()
                // Mengizinkan akses PUT ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.PUT, "/api/company/article/**").permitAll()
                // Mengizinkan akses GET ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/company/article/**").permitAll()
                // Mengizinkan akses DELETE ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.DELETE, "/api/company/article/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/company/search/{title}").permitAll()

                .requestMatchers(HttpMethod.GET, "/api/client/articles/**").permitAll()

                // Mengizinkan akses POST ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.POST, "/api/client/contact/**").permitAll()
                // Mengizinkan akses GET ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/client/contacts/**").permitAll()
                // Mengizinkan akses PUT ke endpoint tertentu tanpa otentikasi
                // Mengizinkan akses GET ke endpoint tertentu tanpa otentikasi
                .requestMatchers(HttpMethod.GET, "/api/client/contact/**").permitAll()
                // Mengizinkan akses DELETE ke endpoint tertentu tanpa otentikasi


                .requestMatchers(HttpMethod.GET, "/api/client/searchC/{address}").permitAll()






                // Mengatur kebijakan manajemen sesi menjadi stateless (tanpa penyimpanan sesi)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // Menambahkan filter requestFilter sebelum UsernamePasswordAuthenticationFilter
                .and()
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class)
                // Membangun konfigurasi keamanan
                .build();
    }

    // Membuat bean AuthenticationManager menggunakan konfigurasi AuthenticationConfiguration
    @Bean
    public AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Membuat bean PasswordEncoder menggunakan BCryptPasswordEncoder untuk mengamankan kata sandi
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
