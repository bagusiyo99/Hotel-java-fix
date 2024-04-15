package com.hotel.services.Blog;

import com.hotel.dto.ArticleDTO;

import java.io.IOException;
import java.util.List;

public interface BlogService {
    boolean postArticle(Long userId, ArticleDTO articleDTO) throws IOException;
    List<ArticleDTO> getAllArticles(Long userId);

    ArticleDTO getArticleById(Long articleId) ;

     boolean updateArticle(Long articleId, ArticleDTO articleDTO) throws IOException ;

    boolean deleteArticle(Long articleId) ;
}
