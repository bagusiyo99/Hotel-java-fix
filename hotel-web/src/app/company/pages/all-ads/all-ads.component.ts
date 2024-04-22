import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent implements OnInit {
  ads: any[] = [];
  pagedAds: any[] = [];
  currentAdsPage: number = 1;
  adsPerPage: number = 6;
  totalAds: number = 0;
  totalAdsPages: number = 0;
  validateForm!: FormGroup;
totalRevenue: number = 0;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]],
    });
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId() {
    this.companyService.getAllAdsByUserid().subscribe(
      (res) => {
        this.ads = res;
        this.totalAds = this.ads.length;
        this.totalAdsPages = Math.ceil(this.totalAds / this.adsPerPage);
        this.updatePagedAds();
        // Menghitung total pendapatan
      this.calculateTotalRevenue();

      },
      (error) => {
        console.error('Failed to load ads:', error);
      }
    );
  }

  updateImg(img: string): string {
    return `data:image/jpeg;base64,${img}`;
  }

  updateAd(adId: any) {
    this.router.navigate(['/company/update', adId]);
  }

  deleteAd(adId: any) {
    this.companyService.deleteAd(adId).subscribe(
      (res) => {
        this.notification.success(
          'SUCCESS',
          'Hapus Data Telah Berhasil',
          { nzDuration: 5000 }
        );
        this.getAllAdsByUserId();
      },
      (error) => {
        console.error('Failed to delete ad:', error);
        this.notification.error(
          'ERROR',
          'Gagal menghapus data',
          { nzDuration: 5000 }
        );
      }
    );
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

searchAdByName() {
    // Ambil nilai dari form control 'service' yang ingin dicari
    const searchTerm = this.validateForm.get('service').value;

    // Jika input pencarian kosong, tampilkan semua data iklan
    if (!searchTerm) {
        this.getAllAdsByUserId();
        return;
    }

    // Lakukan permintaan ke server untuk mencari iklan berdasarkan searchTerm
    this.companyService.searchAdByName(searchTerm).subscribe(
        res => {
            // Simpan hasil pencarian ke variabel ads
            this.ads = res;

            // Jika hasil pencarian kosong, tampilkan notifikasi
            if (!this.ads || this.ads.length === 0) {
                this.notification.warning(
                    'Peringatan',
                    'Tidak ada data yang ditemukan untuk pencarian Anda',
                    { nzDuration: 5000 }
                );
            }

            // Perbarui halaman iklan yang ditampilkan
            this.updatePagedAds();
        },
        error => {
            // Tangani kesalahan jika ada
            console.error('Failed to search ads:', error);
            this.notification.error(
                'ERROR',
                'Gagal mencari data',
                { nzDuration: 5000 }
            );
        }
    );
}


  goToAdsPage(page: number) {
    this.currentAdsPage = page;
    this.updatePagedAds();
  }

  updatePagedAds() {
    const start = (this.currentAdsPage - 1) * this.adsPerPage;
    const end = start + this.adsPerPage;
    this.pagedAds = this.ads.slice(start, end);
  }

  calculateTotalRevenue() {
  this.totalRevenue = this.ads.reduce((total, ad) => {
    // Hanya menghitung pendapatan dari pembayaran yang disetujui
    if (ad.status === 'approved') {
      return total + ad.price;
    } else {
      return total;
    }
  }, 0);
}

}
