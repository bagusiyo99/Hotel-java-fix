package com.hotel.dto;

import com.hotel.enums.ReservationStatus;
import com.hotel.enums.ReviewStatus;
import lombok.Data;

import java.sql.Date;

@Data
public class ReservationDTO {
    private Long id;                          // ID reservasi

    private Date checkInDate;                    // Tanggal pemesanan reservasi

    private String serviceName;               // Nama layanan yang dipesan

    private ReservationStatus reservationStatus; // Status reservasi (misalnya, aktif, selesai, dibatalkan)

    private ReviewStatus reviewStatus;        // Status ulasan (misalnya, ulasan belum dilakukan, ulasan selesai)

    private Long userId;                      // ID pengguna yang melakukan reservasi

    private String userName;                  // Nama pengguna yang melakukan reservasi

    private Long companyId;                   // ID perusahaan yang menyediakan layanan

    private Long adId;                        // ID iklan terkait layanan yang dipesan

    private Double price;

    // Tanggal check-out
    private Date checkOutDate;

    private Double totalPrice;;

}
