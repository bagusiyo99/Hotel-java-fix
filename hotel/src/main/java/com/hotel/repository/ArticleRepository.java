package com.hotel.repository;

import com.hotel.entity.Ad;
import com.hotel.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByUserId(Long userId);
    List<Article> findAllByTitleContaining(String title);

}
