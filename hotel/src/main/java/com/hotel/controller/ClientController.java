package com.hotel.controller;

import com.hotel.dto.ReservationDTO;
import com.hotel.services.Blog.BlogService;
import com.hotel.services.client.ClientService;
import com.hotel.dto.AdDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    // Injeksi dependensi layanan ClientService
    @Autowired
    private ClientService clientService;

    @Autowired
    private BlogService blogService;


    // Mendapatkan semua iklan yang tersedia
    @GetMapping("/ads")
    public ResponseEntity<?> getAllAds() {
        // Mengambil semua iklan melalui ClientService
        return ResponseEntity.ok(clientService.getAllAds());
    }

    @GetMapping("/articles")
    public ResponseEntity<?> getAllArticles () {
        // Mengambil semua iklan melalui ClientService
        return ResponseEntity.ok(clientService.getAllArticles());
    }

    // Mencari iklan berdasarkan nama layanan
    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchAdByService(@PathVariable String name) {
        // Mencari iklan menggunakan ClientService dan mengembalikan hasil pencarian
        return ResponseEntity.ok(clientService.searchAdByName(name));
    }

    // Membuat reservasi layanan
    @PostMapping("/book-service")
    public ResponseEntity<?> bookService(@RequestBody ReservationDTO reservationDTO) {
        // Melakukan reservasi layanan melalui ClientService
        boolean success = clientService.bookService(reservationDTO);
        // Jika berhasil, kembalikan status OK, jika tidak, kembalikan status NOT FOUND
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Mendapatkan detail iklan berdasarkan ID iklan
    @GetMapping("/ad/{adId}")
    public ResponseEntity<?> getAdDetailsByAdId(@PathVariable Long adId) {
        // Mengambil detail iklan melalui ClientService
        return ResponseEntity.ok(clientService.getAdDetailsByAdId(adId));
    }

    // Mendapatkan semua reservasi pengguna berdasarkan ID pengguna
    @GetMapping("/my-bookings/{userId}")
    public ResponseEntity<?> getAllBookingsByUserId(@PathVariable Long userId) {
        // Mengambil semua reservasi pengguna melalui ClientService
        return ResponseEntity.ok(clientService.getAllBookingsByUserId(userId));
    }
}
