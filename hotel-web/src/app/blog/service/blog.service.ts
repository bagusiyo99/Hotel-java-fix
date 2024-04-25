import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  getAllArticles(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/company/articles', {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  constructor(private http: HttpClient) {}

  postArticle(articleDto: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/company/article/${userId}`, articleDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  



  getAllArticlesByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/company/articles/${userId}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
    
  }


  getArticleById(articleId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/article/${articleId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

    updateArticle(articleId: any, articleDto:any): Observable<any> {
    return this.http.put(BASIC_URL + `api/company/article/${articleId}`,articleDto, {
      headers: this.createAuthorizationHeader()
    })
  }

    deleteArticle(articleId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/company/article/${articleId}`, {
      headers: this.createAuthorizationHeader()
    })
  }


    updateBlogById(articleId: any, article: any) {
    throw new Error('Method not implemented.');
  }


 searchArticleByTitle(title:any): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/search/${title}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
    
  }


  // Method untuk membuat header otorisasi
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
