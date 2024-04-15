import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent {
  ads: any;

  constructor(
    private companyService: CompanyService,
     private router: Router,
     private notification :NzNotificationService,
  ) {}

  ngOnInit() {
    this.getAllAdsByUserId();   
  }

  getAllAdsByUserId() {
    this.companyService.getAllAdsByUserid().subscribe(res => {
      this.ads = res;
    });
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }
  // Metode untuk mengarahkan pengguna ke halaman update  dengan ID yang sesuai
  updateAd(adId: any) {
    this.router.navigate(['/company/update', adId]); // Navigasi ke halaman update dengan ID 
  }

deleteAd(adId: any) {
  this.companyService.deleteAd(adId).subscribe(
    res => { 
      this.notification.success(
        'SUCCESS',
        'Hapus Data Telah Berhasil', 
        { nzDuration: 5000 }
      );
      this.getAllAdsByUserId();
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
formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}


}
