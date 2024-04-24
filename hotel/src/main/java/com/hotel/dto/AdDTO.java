package com.hotel.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class AdDTO {
    private Long id;             // ID iklan

    private String serviceName;  // Nama layanan yang diiklankan

    private String description;  // Deskripsi iklan

    private Double price;        // Harga layanan yang diiklankan

    private MultipartFile img;   // File gambar iklan

    private byte[] returnedImg;  // Array byte untuk menyimpan gambar yang telah diambil kembali

    private Long userId;         // ID pengguna yang mengelola iklan

    private String companyName;  // Nama perusahaan yang mengelola iklan
    private String bed;

    // Nama layanan atau produk yang diiklankan
    private String bath;

    private Date createdAt;

}
