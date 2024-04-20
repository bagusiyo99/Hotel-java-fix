import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-dasbhboard',
  templateUrl: './company-dasbhboard.component.html',
  styleUrls: ['./company-dasbhboard.component.scss']
})
export class CompanyDasbhboardComponent {

 bookings: any;

  constructor(
    private companyService: CompanyService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllAdBookings();
  }

 getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe(res => {
      // Ubah checkInDate dan checkOutDate ke objek Date
      res.forEach(item => {
        item.checkInDate = new Date(item.checkInDate);
        item.checkOutDate = new Date(item.checkOutDate);
        
        // Menghitung durasi pemesanan dalam milidetik
        const durationInMillis = item.checkOutDate - item.checkInDate;
        const durationInDays = durationInMillis / (1000 * 60 * 60 * 24);

        // Menghitung total harga
        if (durationInDays <= 0) {
          // Jika durasi pemesanan adalah satu hari atau kurang, gunakan harga awal
          item.totalPrice = item.price;
        } else {
          // Jika durasi lebih dari satu hari, hitung total harga berdasarkan harga dan durasi
          item.totalPrice = durationInDays * item.price;
        }
      });

      // Urutkan data berdasarkan checkInDate dalam urutan menurun (descending)
      this.bookings = res.sort((a, b) => b.checkInDate - a.checkInDate);
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.companyService.changeBookingStatus(bookingId, status).subscribe(
      res => {
        // Notifikasi sukses
        this.notification.success(
          'SUCCESS',
          'Status pemesanan berhasil diubah',
          { nzDuration: 5000 }
        );
        
        // Perbarui daftar pemesanan setelah perubahan status berhasil
        this.getAllAdBookings();
      },
      error => {
        // Tangani kesalahan
        console.error('Gagal mengubah status pemesanan:', error);
        this.notification.error(
          'ERROR',
          'Gagal mengubah status pemesanan',
          { nzDuration: 5000 }
        );
      }
    );
  }

  formatPrice(price: number): string {
    // Format harga dalam format mata uang Indonesia (IDR)
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
}


