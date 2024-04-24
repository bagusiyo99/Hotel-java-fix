import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../client/services/client.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    // Properti untuk menyimpan data iklan dan artikel
    ads: any[];
    articles: any[];
    pagedAds: any[];
    pagedArticles: any[];
    currentAdsPage: number = 1;  // Halaman iklan saat ini
    currentArticlesPage: number = 1;  // Halaman artikel saat ini
    adsPerPage: number = 6;   // Jumlah iklan per halaman
    articlesPerPage: number = 6;  // Jumlah artikel per halaman
    totalAds: number;      // Total iklan
    totalArticles: number; // Total artikel
    totalAdsPages: number;  // Total halaman iklan
    totalArticlesPages: number; // Total halaman artikel

    constructor(
        private clientService: ClientService,
        private router: Router,
        private notification: NzNotificationService
    ) {}

    ngOnInit() {
        // Panggil metode ini untuk memuat semua iklan
        this.getAllAds();
        // Panggil metode ini untuk memuat semua artikel
        this.getAllArticles();
    }

    // Fungsi untuk mengambil iklan
    getAllAds() {
        this.clientService.getAllAds()
            .subscribe(
                (res) => {
                    this.ads = res;
                    this.totalAds = this.ads.length;
                    this.totalAdsPages = Math.ceil(this.totalAds / this.adsPerPage);
                    this.updatePagedAds();
                },
                (error) => {
                    console.error('Failed to load ads:', error);
                }
            );
    }

    // Fungsi untuk mengambil artikel
    getAllArticles() {
        this.clientService.getAllArticles()
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

    // Fungsi untuk mengambil iklan untuk halaman saat ini
    updatePagedAds() {
        const start = (this.currentAdsPage - 1) * this.adsPerPage;
        const end = start + this.adsPerPage;
        this.pagedAds = this.ads.slice(start, end);
    }

    // Fungsi untuk mengambil artikel untuk halaman saat ini
    updatePagedArticles() {
        const start = (this.currentArticlesPage - 1) * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        this.pagedArticles = this.articles.slice(start, end);
    }

    // Fungsi untuk mengatur halaman iklan
    goToAdsPage(page: number) {
        this.currentAdsPage = page;
        this.updatePagedAds();
    }

    // Fungsi untuk mengatur halaman artikel
    goToArticlesPage(page: number) {
        this.currentArticlesPage = page;
        this.updatePagedArticles();
    }

    handleBooking() {
        // Jika pengguna belum login, tampilkan notifikasi peringatan
        this.notification.warning(
            'Login Required',
            'Tolong Login Terlebih dahulu'
        );
        // Arahkan pengguna ke halaman login
        this.router.navigate(['/login']);
    }

    // Fungsi untuk mengubah gambar menjadi data URL
    updateImg(img) {
        return 'data:image/jpeg;base64,' + img;
    }

    // Fungsi untuk memformat harga
    formatPrice(price: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }



limitDescription(description: string, limit: number): string {
    if (description.length > limit) {
        return description.substring(0, limit) + '...'; // Menambahkan elipsis untuk menandakan bahwa deskripsi telah dipotong
    } else {
        return description;
    }
}

  // Fungsi untuk navigasi ke halaman login
  goToLogin() {
    this.router.navigate(['/login']);
  }

}
