package com.hotel.controller;

import com.hotel.dto.AuthenticationRequest;
import com.hotel.dto.SignupRequestDTO;
import com.hotel.dto.UserDto;
import com.hotel.entity.User;
import com.hotel.repository.UserRepository;
import com.hotel.services.authentication.AuthService;
import com.hotel.services.jwt.UserDetailsServiceImpl;
import com.hotel.until.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController {

    // Menggunakan AuthService untuk mengelola operasi otentikasi dan pendaftaran
    @Autowired
    private AuthService authService;

    // Menggunakan AuthenticationManager untuk melakukan operasi otentikasi pengguna
    @Autowired
    private AuthenticationManager authenticationManager;

    // Menggunakan UserDetailsServiceImpl untuk mengambil rincian pengguna
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // Menggunakan JwtUtil untuk mengelola token JWT
    @Autowired
    private JwtUtil jwtUtil;

    // Menggunakan UserRepository untuk akses data pengguna
    @Autowired
    private UserRepository userRepository;

    // Konstanta yang digunakan untuk menambahkan token JWT ke header respons
    public static final String TOKEN_PREFIX = "Bearer";
    public static final String HEADER_STRING = "Authorization";

    // Metode untuk mendaftar pengguna klien baru
    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTO signupRequestDTO) {
        // Periksa apakah email sudah terdaftar
        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Buat akun terlebih dahulu", HttpStatus.NOT_ACCEPTABLE);
        }
        // Mendaftar klien baru
        UserDto createdUser = authService.signupClient(signupRequestDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    // Metode untuk mendaftar pengguna perusahaan baru
    @PostMapping("/company/sign-up")
    public ResponseEntity<?> signupCompany(@RequestBody SignupRequestDTO signupRequestDTO) {
        // Periksa apakah email sudah terdaftar
        if (authService.presentByEmail(signupRequestDTO.getEmail())) {
            return new ResponseEntity<>("Buat akun terlebih dahulu", HttpStatus.NOT_ACCEPTABLE);
        }
        // Mendaftar perusahaan baru
        UserDto createdUser = authService.signupCompany(signupRequestDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    // Metode untuk mengautentikasi pengguna dan membuat token JWT
    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
                                          HttpServletResponse response) throws IOException, JSONException {
        try {
            // Mencoba mengautentikasi pengguna menggunakan AuthenticationManager
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()
            ));
        } catch (BadCredentialsException e) {
            // Jika kredensial salah, lempar pengecualian BadCredentialsException
            throw new BadCredentialsException("username salah", e);
        }

        // Mengambil rincian pengguna menggunakan UserDetailsServiceImpl
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        // Menghasilkan token JWT untuk pengguna yang diautentikasi
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        // Mengambil entitas pengguna dari repositori berdasarkan username
        User user = userRepository.findFirstByEmail(authenticationRequest.getUsername());

        // Membuat JSON respons dengan ID pengguna dan peran
        response.getWriter().write(new JSONObject()
                .put("userId", user.getId())
                .put("role", user.getRole())
                .toString()
        );

        // Mengatur header respons untuk menampilkan header Authorization
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Allow-Headers", "Authorization," +
                "X-PINGOTHER Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");

        // Menambahkan token JWT ke header Authorization
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }

}
