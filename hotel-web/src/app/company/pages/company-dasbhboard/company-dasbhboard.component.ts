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
  totalPemesananDiApprove: number = 0;
  approvedBookingIds: string[] = [];

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
      this.totalPendapatan = 0;
      this.totalPajak = 0;
      this.totalPemesananDiApprove = 0;
      this.approvedBookingIds = [];

      res.forEach(item => {
        item.checkInDate = new Date(item.checkInDate);
        item.checkOutDate = new Date(item.checkOutDate);
        
        const durationInMillis = item.checkOutDate.getTime() - item.checkInDate.getTime();
        const durationInDays = durationInMillis / (1000 * 60 * 60 * 24);

        if (durationInDays <= 0) {
          item.totalPrice = item.price;
        } else {
          item.totalPrice = durationInDays * item.price;
        }

        const taxRate = 0.11; 
        item.tax = item.totalPrice * taxRate;

        item.totalPayment = item.totalPrice + item.tax;

        if (item.reservationStatus === 'APPROVED') {
          this.totalPendapatan += item.totalPayment;
          this.totalPajak += item.tax;
          this.totalPemesananDiApprove++;
          this.approvedBookingIds.push(item.id);
        }
      });

      const approvedRoomCounts = {};
      res.forEach(item => {
        if (item.reservationStatus === 'APPROVED') {
          approvedRoomCounts[item.serviceName] = (approvedRoomCounts[item.serviceName] || 0) + 1;
        }
      });
      const mostOrderedApprovedRoom = Object.keys(approvedRoomCounts).reduce((a, b) => approvedRoomCounts[a] > approvedRoomCounts[b] ? a : b);
      this.roomTerbanyak = mostOrderedApprovedRoom;

      this.bookings = res.sort((a, b) => b.checkInDate - a.checkInDate);
    });
  }

  generateLaporan() {
    this.totalPendapatan = 0;
    this.totalPajak = 0;
    this.totalPemesananDiApprove = 0;
    this.approvedBookingIds = [];

    this.getAllAdBookings();
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
