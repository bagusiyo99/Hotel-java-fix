package com.hotel.controller;

import com.hotel.dto.AdDTO;
import com.hotel.dto.ReservationDTO;
import com.hotel.entity.Reservation;
import com.hotel.services.company.CompanyService;
import com.hotel.services.contact.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ContactService contactService;

    // Metode untuk memposting iklan
    @PostMapping("/ad/{userId}")
    public ResponseEntity<?> postAd(@PathVariable Long userId, @ModelAttribute AdDTO adDTO) throws IOException {
        // Memposting iklan menggunakan CompanyService
        boolean success = companyService.postAd(userId, adDTO);
        // Jika berhasil, kembalikan status OK, jika tidak, kembalikan status NOT FOUND
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Metode untuk mendapatkan semua iklan berdasarkan ID pengguna
    @GetMapping("/ads/{userId}")
    public ResponseEntity<?> getAllAdsByUserId(@PathVariable Long userId) {
        // Mengambil semua iklan menggunakan CompanyService
        return ResponseEntity.ok(companyService.getAllAds(userId));
    }

    // Metode untuk mendapatkan iklan berdasarkan ID iklan
    @GetMapping("/ad/{adId}")
    public ResponseEntity<?> getAdById(@PathVariable Long adId) {
        // Mengambil iklan menggunakan CompanyService
        AdDTO adDTO = companyService.getAdById(adId);
        // Jika iklan ditemukan, kembalikan data iklan, jika tidak, kembalikan status NOT FOUND
        if (adDTO != null) {
            return ResponseEntity.ok(adDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Metode untuk memperbarui iklan berdasarkan ID iklan
    @PutMapping("/ad/{adId}")
    public ResponseEntity<?> updateAd(@PathVariable Long adId, @ModelAttribute AdDTO adDTO) throws IOException {
        // Memperbarui iklan menggunakan CompanyService
        boolean success = companyService.updateAd(adId, adDTO);
        // Jika berhasil, kembalikan status OK, jika tidak, kembalikan status NOT FOUND
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Metode untuk menghapus iklan berdasarkan ID iklan
    @DeleteMapping("/ad/{adId}")
    public ResponseEntity<?> deleteAd(@PathVariable Long adId) {
        // Menghapus iklan menggunakan CompanyService
        boolean success = companyService.deleteAd(adId);
        // Jika berhasil, kembalikan status OK, jika tidak, kembalikan status NOT FOUND
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Metode untuk mendapatkan semua reservasi berdasarkan ID perusahaan
    @GetMapping("/bookings/{companyId}")
    public ResponseEntity<List<ReservationDTO>> getAllAdBookings(@PathVariable Long companyId) {
        // Mengambil semua reservasi menggunakan CompanyService
        return ResponseEntity.ok(companyService.getAllAdBookings(companyId));
    }

    // Metode untuk mengubah status reservasi berdasarkan ID reservasi dan status baru
    @PutMapping("/booking/{bookingId}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status) {
        // Mengubah status reservasi menggunakan CompanyService
        boolean success = companyService.changeBookingStatus(bookingId, status);
        // Jika berhasil, kembalikan status OK, jika tidak, kembalikan status NOT FOUND
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/booking/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId) {
        // Menghapus reservasi menggunakan CompanyService
        boolean success = companyService.deleteBooking(bookingId);
        // Jika berhasil, kembalikan status OK, jika tidak, kembalikan status NOT FOUND
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchAdByService(@PathVariable String name) {
        // Mencari iklan menggunakan ClientService dan mengembalikan hasil pencarian
        return ResponseEntity.ok(companyService.searchAdByName(name));
    }


    @GetMapping("/contacts")
    public ResponseEntity<?> getAllContact() {
        return ResponseEntity.ok(companyService.getAllContact());
    }

}
