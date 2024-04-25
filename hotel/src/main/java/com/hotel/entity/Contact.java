package com.hotel.entity;


import com.hotel.dto.ContactDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Table(name = "contacts")
@Data

public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;

    private String address;
    @Lob
    @Column(length = 1000) // Mengatur panjang maksimum kolom menjadi 1000 karakter
    private String description;




    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;


    private Date createdAt;



    public ContactDTO getContactDto() {
        ContactDTO contactDTO  = new ContactDTO();
        contactDTO.setId(id);
        contactDTO.setPhone(phone);
        contactDTO.setDescription(description);
        contactDTO.setAddress(address);
        contactDTO.setCreatedAt(createdAt);
        contactDTO.setCompanyName(user.getName()); // Tambahkan nama perusahaan ke DTO

        // Mengembalikan objek
        return contactDTO;
    }
}
