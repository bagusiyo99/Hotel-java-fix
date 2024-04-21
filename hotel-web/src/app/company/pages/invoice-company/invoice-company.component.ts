import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-company',
  templateUrl: './invoice-company.component.html',
  styleUrls: ['./invoice-company.component.scss']
})
export class InvoiceCompanyComponent implements OnInit {
  booking: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Periksa apakah ada data pemesanan yang disertakan saat navigasi
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.booking = navigation.extras.state['booking'];
    }
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
