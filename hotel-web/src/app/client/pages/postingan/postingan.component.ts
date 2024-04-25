import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-postingan',
  templateUrl: './postingan.component.html',
  styleUrls: ['./postingan.component.scss']
})
export class PostinganComponent implements OnInit {

  ads: any[] = [];
  pagedAds: any[] = [];
  currentAdsPage: number = 1;
  adsPerPage: number = 6;
  totalAds: number = 0;
  totalAdsPages: number = 0;
  validateForm!: FormGroup;


  constructor(
    private clientService: ClientService,
     private router: Router,
     private notification :NzNotificationService,
     private fb :FormBuilder,

  ) {}

  ngOnInit() {
        this.validateForm = this.fb.group({
      service: [null, [Validators.required]],
    });
    this.getAllAds();   
  }

  // getAllAds() {
  //   this.clientService.getAllAds().subscribe(res => {
  //     this.ads = res;
  //   });
  // }

    getAllAds() {
    this.clientService.getAllAds().subscribe(
      (res) => {
        this.ads = res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

  // searchAdByName(){
  //   this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res => {
  //     this.ads = res;
  //   })
  // }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
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
        this.getAllAds();
        return;
    }

    // Lakukan permintaan ke server untuk mencari iklan berdasarkan searchTerm
    this.clientService.searchAdByName(searchTerm).subscribe(
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


  limitDescription(description: string, limit: number): string {
    if (description.length > limit) {
        return description.substring(0, limit) + '...'; // Menambahkan elipsis untuk menandakan bahwa deskripsi telah dipotong
    } else {
        return description;
    }
}
}
