package com.hotel.controller;

import com.hotel.dto.ArticleDTO;
import com.hotel.services.Blog.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/article/{userId}")
    public ResponseEntity<?> postArticle(@PathVariable Long userId, @ModelAttribute ArticleDTO articleDTO) throws IOException {
        boolean success = blogService.postArticle(userId, articleDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User does not have the required Company role.");
        }
    }


    @GetMapping("/articles/{userId}")
    public ResponseEntity<?> getAllArticlesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(blogService.getAllArticles(userId));
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<?> getArticleById(@PathVariable Long articleId) {
        ArticleDTO articleDTO = blogService.getArticleById(articleId);
        if (articleDTO != null) {
            return ResponseEntity.ok(articleDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/article/{articleId}")
    public ResponseEntity<?> updateArticle(@PathVariable Long articleId, @ModelAttribute ArticleDTO articleDTO) throws IOException {
        boolean success = blogService.updateArticle(articleId, articleDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User does not have the required Company role.");
        }
    }

    @DeleteMapping("/article/{articleId}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long articleId) {
        boolean success = blogService.deleteArticle(articleId);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found or user does not have the required Company role.");
        }
    }
}
