// Paket dan impor
package com.hotel.services.jwt;

import com.hotel.entity.User;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Dependency injection untuk UserRepository
    @Autowired
    private UserRepository userRepository;

    // Metode untuk memuat detail pengguna berdasarkan email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Mencari pengguna berdasarkan email
        User user = userRepository.findFirstByEmail(email);

        // Jika pengguna tidak ditemukan, lempar UsernameNotFoundException
        if (user == null) {
            throw new UsernameNotFoundException("User tidak ditemukan dengan email: " + email);
        }

        // Mengembalikan objek UserDetails yang dibuat dari email dan password pengguna
        // Serta memberikan otoritas kosong (ArrayList kosong) karena tidak ada peran atau otoritas yang diberikan
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

}
