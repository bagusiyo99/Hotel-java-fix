package com.hotel.entity;

import com.hotel.dto.ArticleDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Table(name = "articles")
@Data

public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(length = 1000) // Mengatur panjang maksimum kolom menjadi 1000 karakter
    private String description;

    // Gambar iklan sebagai array byte (LOB - Large Object)
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;


    private Date createdAt;



    public ArticleDTO getArticleDto() {
        ArticleDTO articleDTO = new ArticleDTO();
        articleDTO.setId(id);
        articleDTO.setTitle(title);
        articleDTO.setDescription(description);
        articleDTO.setCreatedAt(createdAt);
        articleDTO.setReturnedImg(img);
        articleDTO.setCompanyName(user.getName()); // Tambahkan nama perusahaan ke DTO

        // Mengembalikan objek
        return articleDTO;
    }
}
