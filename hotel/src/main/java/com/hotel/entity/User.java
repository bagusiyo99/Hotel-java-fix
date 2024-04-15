// Paket dan impor
package com.hotel.entity;

import com.hotel.dto.UserDto;
import com.hotel.enums.UserRole;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    // Id entitas pengguna; ini adalah kunci utama (primary key)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik pengguna yang akan di-generate otomatis

    // Nama depan pengguna
    private String name;

    // Email pengguna
    private String email;

    // Kata sandi pengguna (harus disimpan dengan aman)
    private String password;

    // Nama belakang pengguna
    private String lastname;

    // Nomor telepon pengguna
    private String phone;

    // Peran pengguna (enum UserRole)
    private UserRole role;

    // Metode untuk mengonversi entitas User menjadi objek UserDto
    public UserDto getDto() {
        // Membuat instance UserDto
        UserDto userDto = new UserDto();
        // Menetapkan nilai-nilai entitas User ke objek UserDto
        userDto.setId(id);
        userDto.setName(name);
        userDto.setEmail(email);
        userDto.setRole(role);

        // Mengembalikan objek UserDto
        return userDto;
    }
}
