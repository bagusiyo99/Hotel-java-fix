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

  //03.21
  bookings:any;
    constructor (
    private companyService: CompanyService,
     private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router
     ){}


  ngOnInit() {
    this.getAllAdBookings();
  }

  getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe(res => {
      console.log (res);
      this.bookings = res;
    })
  }

//   changeBookingStatus(bookingId: number, status: string) {
//   this.companyService.changeBookingStatus(bookingId, status).subscribe(
//     res => {
//       // Notifikasi sukses
//       this.notification.success(
//         'SUCCESS',
//         'Status pemesanan berhasil diubah', 
//         { nzDuration: 5000 }
//       );
//       // Memperbarui daftar pemesanan setelah perubahan status berhasil
//       this.getAllAdBookings();
//     },
//     error => {
//       // Tangani kesalahan
//       console.error('Failed to change booking status:', error);
//       this.notification.error(
//         'ERROR',
//         'Gagal mengubah status pemesanan', 
//         { nzDuration: 5000 }
//       );
//     }
//   );
// }

changeBookingStatus(bookingId: number, status: string) {
  this.companyService.changeBookingStatus(bookingId, status).subscribe(
    res => {
      // Notifikasi sukses
      this.notification.success(
        'SUCCESS',
        'Status pemesanan berhasil diubah',
        { nzDuration: 5000 }
      );
      
      // Memperbarui daftar pemesanan setelah perubahan status berhasil
      this.getAllAdBookings();
      
      // Log untuk memeriksa data yang diperbarui
      console.log('Bookings after update:', this.bookings);
    },
    error => {
      // Tangani kesalahan
      console.error('Failed to change booking status:', error);
      this.notification.error(
        'ERROR',
        'Gagal mengubah status pemesanan',
        { nzDuration: 5000 }
      );
    }
  );
}


}


