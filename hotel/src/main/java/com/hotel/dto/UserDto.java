package com.hotel.dto;

import com.hotel.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;           // ID pengguna

    private String name;       // Nama depan pengguna

    private String email;      // Email pengguna

    private String password;   // Kata sandi pengguna (perlu dipertimbangkan untuk menyimpan dalam bentuk terenkripsi)

    private String lastname;   // Nama belakang pengguna

    private String phone;      // Nomor telepon pengguna

    private UserRole role;     // Peran pengguna dalam sistem (misalnya, pelanggan, perusahaan, admin)
}
