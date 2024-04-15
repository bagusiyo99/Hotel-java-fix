// Paket
package com.hotel.services.authentication;

import com.hotel.dto.SignupRequestDTO;
import com.hotel.dto.UserDto;
import com.hotel.entity.User;

// Deklarasi antarmuka AuthService
public interface AuthService {

    // Metode untuk mendaftar pengguna baru sebagai client
    UserDto signupClient(SignupRequestDTO signupRequestDTO);

    // Metode untuk memeriksa apakah pengguna sudah ada berdasarkan email
    Boolean presentByEmail(String email);

    // Metode untuk mendaftar pengguna baru sebagai company
    UserDto signupCompany(SignupRequestDTO signupRequestDTO);
}
