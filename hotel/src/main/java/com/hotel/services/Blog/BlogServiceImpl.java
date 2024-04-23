package com.hotel.services.Blog;

import com.hotel.dto.AdDTO;
import com.hotel.dto.ArticleDTO;
import com.hotel.entity.Ad;
import com.hotel.entity.Article;
import com.hotel.entity.User;
import com.hotel.enums.UserRole;
import com.hotel.repository.ArticleRepository;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public boolean postArticle(Long userId, ArticleDTO articleDTO) throws IOException {
        // Validasi peran pengguna
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getRole() == UserRole.COMPANY) { // Pastikan pengguna memiliki peran COMPANY
                Article article = new Article();
                article.setTitle(articleDTO.getTitle());
                article.setDescription(articleDTO.getDescription());
                article.setImg(articleDTO.getImg().getBytes());
                article.setUser(user);
                article.setCreatedAt(new Date());
                articleRepository.save(article);
                return true;
            }
        }
        return false; // Mengembalikan false jika pengguna tidak memiliki peran COMPANY
    }

    @Override
    public List<ArticleDTO> getAllArticles(Long userId) {
        return articleRepository.findByUserId(userId)
                .stream()
                .map(Article::getArticleDto)
                .collect(Collectors.toList());
    }

    @Override
    public ArticleDTO getArticleById(Long articleId) {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isPresent()) {
            return optionalArticle.get().getArticleDto();
        }
        return null;
    }

    @Override
    public boolean updateArticle(Long articleId, ArticleDTO articleDTO) throws IOException {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isPresent()) {
            Article article = optionalArticle.get();
            article.setTitle(articleDTO.getTitle());
            article.setDescription(articleDTO.getDescription());

            if (articleDTO.getImg() != null) {
                article.setImg(articleDTO.getImg().getBytes());
            }

            articleRepository.save(article);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteArticle(Long articleId) {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isPresent()) {
            articleRepository.delete(optionalArticle.get());
            return true;
        }
        return false;
    }

    // Metode untuk mencari iklan berdasarkan nama
    public List<ArticleDTO> searchArticleByTitle(String title) {
        // Menggunakan stream untuk memetakan setiap Ad menjadi AdDTO berdasarkan nama yang diberikan
        return articleRepository.findAllByTitleContaining(title).stream().map(Article::getArticleDto).collect(Collectors.toList());
    }
}
