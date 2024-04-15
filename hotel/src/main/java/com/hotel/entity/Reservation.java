// Paket dan impor
package com.hotel.entity;

import com.hotel.dto.AdDTO;
import com.hotel.dto.ReservationDTO;
import com.hotel.enums.ReservationStatus;
import com.hotel.enums.ReviewStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;

@Entity
@Data
public class Reservation {

    // ID unik untuk setiap entitas reservasi; ini adalah kunci utama
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Status reservasi menggunakan enum ReservationStatus
    private ReservationStatus reservationStatus;

    // Status review menggunakan enum ReviewStatus
    private ReviewStatus reviewStatus;

    // Tanggal pemesanan
    private Date bookDate;

    // Hubungan dengan entitas User untuk pengguna yang membuat reservasi
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    // Hubungan dengan entitas User untuk perusahaan yang menerima reservasi
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User company;

    // Hubungan dengan entitas Ad untuk iklan yang dipesan
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ad_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ad ad;

    // Metode untuk mengonversi entitas Reservation menjadi objek ReservationDTO
    public ReservationDTO getReservationDTO() {
        // Membuat instance ReservationDTO
        ReservationDTO dto = new ReservationDTO();
        // Menetapkan nilai-nilai entitas Reservation ke objek ReservationDTO
        dto.setId(id);
        dto.setServiceName(ad.getServiceName());
        dto.setBookDate(bookDate);
        dto.setReservationStatus(reservationStatus);
        dto.setReviewStatus(reviewStatus);

        // Menetapkan ID Ad, ID perusahaan, dan nama pengguna ke objek DTO
        dto.setAdId(ad.getId());
        dto.setCompanyId(company.getId());
        dto.setUserName(user.getName());

        // Mengembalikan objek ReservationDTO
        return dto;
    }
}
