package com.hotel.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data

public class ContactDTO {
    private Long id;
    private String name;
    private String description;
    private String address;
    private Date createdAt;
    private Long userId;
    private String userName;

    // Properti untuk relasi ke Company
    private Long companyId;  // ID perusahaan yang terkait
    private String companyName;  // Nama perusahaan yang terkait
}
