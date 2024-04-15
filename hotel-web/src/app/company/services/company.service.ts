

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  updateAdById(adId: any, ad: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  postAd(adDto: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/company/ad/${userId}`, adDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getAllAdsByUserid(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/company/ads/${userId}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
    
  }

  //02.07

  getAdById(adId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

//02.15
    updateAd(adId: any, adDto:any): Observable<any> {
    return this.http.put(BASIC_URL + `api/company/ad/${adId}`,adDto, {
      headers: this.createAuthorizationHeader()
    })
  }

    deleteAd(adId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/company/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    })
  }




    getAllAdBookings(): Observable<any> {
      const companyId = UserStorageService.getUserId();
         return this.http.get(BASIC_URL + `api/company/bookings/${companyId}`, {
      headers: this.createAuthorizationHeader()
    })
  } 

      changeBookingStatus(bookingId: number, status : string): Observable<any> {
        return this.http.put(BASIC_URL + `api/company/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    })
  } 






  
  postBlog(articleDto: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/blog/article/${userId}`, articleDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


  getAllBLogsByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/blog/articles/${userId}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
    
  }


  getBlogById(articleId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/blog/article/${articleId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

    updateBlog(articleId: any, articleDto:any): Observable<any> {
    return this.http.put(BASIC_URL + `api/blog/article/${articleId}`,articleDto, {
      headers: this.createAuthorizationHeader()
    })
  }

    deleteBlog(articleId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/blog/article/${articleId}`, {
      headers: this.createAuthorizationHeader()
    })
  }


    updateBlogById(articleId: any, article: any) {
    throw new Error('Method not implemented.');
  }



  
   createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

}
