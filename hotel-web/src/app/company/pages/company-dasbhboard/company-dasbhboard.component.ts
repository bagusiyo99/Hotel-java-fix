import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-company-dasbhboard',
  templateUrl: './company-dasbhboard.component.html',
  styleUrls: ['./company-dasbhboard.component.scss']
})
export class CompanyDasbhboardComponent {
   bookings: any;
  totalPendapatan: number = 0;
  totalPajak: number = 0;
  roomTerbanyak: string = '';

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
        const durationInMillis = item.checkOutDate.getTime() - item.checkInDate.getTime();
        const durationInDays = durationInMillis / (1000 * 60 * 60 * 24);

        // Menghitung total harga
        if (durationInDays <= 0) {
          // Jika durasi pemesanan adalah satu hari atau kurang, gunakan harga awal
          item.totalPrice = item.price;
        } else {
          // Jika durasi lebih dari satu hari, hitung total harga berdasarkan harga dan durasi
          item.totalPrice = durationInDays * item.price;
        }

        // Menambahkan informasi pajak (misalnya, 11%)
        const taxRate = 0.11; // 11%
        item.tax = item.totalPrice * taxRate;

        // Menambahkan total pembayaran (total harga + pajak)
        item.totalPayment = item.totalPrice + item.tax;

        // Mengupdate total pendapatan dan total pajak
        if (item.reservationStatus === 'APPROVED') {
          this.totalPendapatan += item.totalPayment;
          this.totalPajak += item.tax;
        }
      });

    // Mencari room terbanyak yang di-approve
    const approvedRoomCounts = {};
    res.forEach(item => {
      if (item.reservationStatus === 'APPROVED') {
        approvedRoomCounts[item.serviceName] = (approvedRoomCounts[item.serviceName] || 0) + 1;
      }
    });
    const mostOrderedApprovedRoom = Object.keys(approvedRoomCounts).reduce((a, b) => approvedRoomCounts[a] > approvedRoomCounts[b] ? a : b);
    this.roomTerbanyak = mostOrderedApprovedRoom;


      // Urutkan data berdasarkan checkInDate dalam urutan menurun (descending)
      this.bookings = res.sort((a, b) => b.checkInDate - a.checkInDate);
    });
  }

  generateLaporan() {
    // Reset nilai
    this.totalPendapatan = 0;
    this.totalPajak = 0;
    this.roomTerbanyak = '';

    // Hitung ulang data untuk laporan
    this.getAllAdBookings();
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


