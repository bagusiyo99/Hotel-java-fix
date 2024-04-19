import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  bookedServices: any[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getMyBookings();
  }

  getMyBookings() {
    this.clientService.getMyBookings().subscribe(
      res => {
        this.processBookingsData(res);
      },
      error => {
        this.notification.error(
          'ERROR',
          'Gagal mendapatkan data pemesanan: ' + error.message,
          { nzDuration: 5000 }
        );
      }
    );
  }

  processBookingsData(bookings: any[]) {
    this.bookedServices = bookings.map(item => {
      item.checkInDate = new Date(item.checkInDate);
      item.checkOutDate = item.checkOutDate ? new Date(item.checkOutDate) : null;
      
      // Hitung total harga jika checkOutDate tersedia
      if (item.checkOutDate) {
        const durationInMilliseconds = item.checkOutDate.getTime() - item.checkInDate.getTime();
        const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
        item.totalPrice = durationInDays * item.price;
      } else {
        console.error('Check-out date is missing or invalid:', item);
        item.totalPrice = 0;
      }
      
      return item;
    }).sort((a, b) => b.checkInDate.getTime() - a.checkInDate.getTime());
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
