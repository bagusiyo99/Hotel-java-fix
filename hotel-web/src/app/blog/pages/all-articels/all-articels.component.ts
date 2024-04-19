import { Component } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-articels',
  templateUrl: './all-articels.component.html',
  styleUrls: ['./all-articels.component.scss']
})
export class AllArticelsComponent {
    articles: any;
     pagedArticles: any[];
    currentArticlesPage: number = 1;  // Halaman artikel saat ini
    articlesPerPage: number = 6;  // Jumlah artikel per halaman
    totalArticles: number; // Total artikel
    totalArticlesPages: number; // Total halaman artikel
  validateForm!: FormGroup;


  constructor(
    private blogService: BlogService,
     private router: Router,
     private notification :NzNotificationService,
         private fb: FormBuilder

  ) {}

  ngOnInit() {
     this.validateForm = this.fb.group({
      service: [null, [Validators.required]],
    });
    this.getAllArticlesByUserId();   
  }

  // getAllArticlesByUserId() {
  //   this.blogService.getAllArticlesByUserId().subscribe(res => {
  //     this.articles = res;
  //   });
  // }
    getAllArticlesByUserId() {
        this.blogService.getAllArticlesByUserId()
            .subscribe(
                (res) => {
                    this.articles = res;
                    this.totalArticles = this.articles.length;
                    this.totalArticlesPages = Math.ceil(this.totalArticles / this.articlesPerPage);
                    this.updatePagedArticles();
                },
                (error) => {
                    console.error('Failed to load articles:', error);
                }
            );
    }


  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }
  // Metode untuk mengarahkan pengguna ke halaman update  dengan ID yang sesuai
  updateArticle(articleId: any) {
    this.router.navigate(['/blog/update', articleId]); // Navigasi ke halaman update dengan ID 
  }

deleteArticle(articleId: any) {
  this.blogService.deleteArticle(articleId).subscribe(
    res => { 
      this.notification.success(
        'SUCCESS',
        'Hapus Data Telah Berhasil', 
        { nzDuration: 5000 }
      );
      this.getAllArticlesByUserId();
    },
    error => {
      // Tangani kesalahan jika ada
      console.error('Failed to delete ad:', error);
      this.notification.error(
        'ERROR',
        'Gagal menghapus data',
        { nzDuration: 5000 }
      );
    }
  );
}

searchArticleByTitle() {
    // Ambil nilai dari form control 'service' yang ingin dicari
    const searchTerm = this.validateForm.get('service').value;

    // Jika input pencarian kosong, tampilkan semua data iklan
    if (!searchTerm) {
        this.getAllArticlesByUserId();
        return;
    }

    // Lakukan permintaan ke server untuk mencari iklan berdasarkan searchTerm
    this.blogService.searchArticleByTitle (searchTerm).subscribe(
        res => {
            // Simpan hasil pencarian ke variabel ads
            this.articles = res;

            // Jika hasil pencarian kosong, tampilkan notifikasi
            if (!this.articles || this.articles.length === 0) {
                this.notification.warning(
                    'Peringatan',
                    'Tidak ada data yang ditemukan untuk pencarian Anda',
                    { nzDuration: 5000 }
                );
            }

            // Perbarui halaman iklan yang ditampilkan
            this.updatePagedArticles();
        },
        error => {
            // Tangani kesalahan jika ada
            console.error('Failed to search articles:', error);
            this.notification.error(
                'ERROR',
                'Gagal mencari data',
                { nzDuration: 5000 }
            );
        }
    );
}


   // Fungsi untuk mengambil artikel untuk halaman saat ini
    updatePagedArticles() {
        const start = (this.currentArticlesPage - 1) * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        this.pagedArticles = this.articles.slice(start, end);
    }


       // Fungsi untuk mengatur halaman artikel
    goToArticlesPage(page: number) {
        this.currentArticlesPage = page;
        this.updatePagedArticles();
    }





}
