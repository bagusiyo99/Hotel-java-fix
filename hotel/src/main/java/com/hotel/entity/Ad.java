// Paket dan impor
package com.hotel.entity;

import com.hotel.dto.AdDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "ads")
@Data
public class Ad {

    // ID unik untuk setiap entitas iklan; ini adalah kunci utama
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nama layanan atau produk yang diiklankan
    private String serviceName;

    // Deskripsi detail iklan
    private String description;

    // Harga layanan atau produk yang diiklankan
    private Double price;

    // Gambar iklan sebagai array byte (LOB - Large Object)
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

    // Hubungan dengan entitas User
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    // Metode untuk mengonversi entitas Ad menjadi objek AdDTO
    public AdDTO getAdDto() {
        // Membuat instance AdDTO
        AdDTO adDTO = new AdDTO();
        // Menetapkan nilai-nilai entitas Ad ke objek AdDTO
        adDTO.setId(id);
        adDTO.setServiceName(serviceName);
        adDTO.setDescription(description);
        adDTO.setPrice(price);
        // Mengambil nama pengguna dari entitas User yang terkait
        adDTO.setCompanyName(user.getName());
        // Mengambil gambar iklan
        adDTO.setReturnedImg(img);

        // Mengembalikan objek AdDTO
        return adDTO;
    }
}
