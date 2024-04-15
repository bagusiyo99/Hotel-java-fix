// Paket dan impor
package com.hotel.services.authentication;

import com.hotel.dto.SignupRequestDTO;
import com.hotel.dto.UserDto;
import com.hotel.entity.User;
import com.hotel.enums.UserRole;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServicelmpl implements AuthService {

    // Menginjeksi dependency UserRepository menggunakan anotasi @Autowired
    @Autowired
    private UserRepository userRepository;

    // Metode untuk mendaftar pengguna baru sebagai client
    public UserDto signupClient(SignupRequestDTO signupRequestDTO) {
        // Membuat entitas User baru
        User user = new User();
        user.setName(signupRequestDTO.getName());
        user.setLastname(signupRequestDTO.getLastname());
        user.setEmail(signupRequestDTO.getEmail());
        user.setPhone(signupRequestDTO.getPhone());

        // Mengenkripsi password menggunakan BCrypt
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTO.getPassword()));

        // Menetapkan peran pengguna sebagai CLIENT
        user.setRole(UserRole.CLIENT);

        // Menyimpan entitas User dan mengembalikan DTO
        return userRepository.save(user).getDto();
    }

    // Metode untuk memeriksa apakah pengguna sudah ada berdasarkan email
    public Boolean presentByEmail(String email) {
        // Mencari pengguna berdasarkan email dan mengembalikan true jika ditemukan, false jika tidak
        return userRepository.findFirstByEmail(email) != null;
    }

    // Metode untuk mendaftar pengguna baru sebagai company
    public UserDto signupCompany(SignupRequestDTO signupRequestDTO) {
        // Membuat entitas User baru
        User user = new User();
        user.setName(signupRequestDTO.getName());
        user.setEmail(signupRequestDTO.getPhone());
        user.setEmail(signupRequestDTO.getEmail());

        // Mengenkripsi password menggunakan BCrypt
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTO.getPassword()));

        // Menetapkan peran pengguna sebagai COMPANY
        user.setRole(UserRole.COMPANY);

        // Menyimpan entitas User dan mengembalikan DTO
        return userRepository.save(user).getDto();
    }
}
