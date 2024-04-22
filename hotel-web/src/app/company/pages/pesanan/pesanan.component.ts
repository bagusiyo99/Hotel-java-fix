import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.component.html',
  styleUrls: ['./pesanan.component.scss']
})
export class PesananComponent {
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

      // Menambahkan informasi pajak (misalnya, 11%)
      const taxRate = 0.11; // 11%
      item.tax = item.totalPrice * taxRate;

      // Menambahkan total pembayaran (total harga + pajak)
      item.totalPayment = item.totalPrice + item.tax;

      });

      // Urutkan data berdasarkan checkInDate dalam urutan menurun (descending)
      this.bookings = res.sort((a, b) => b.checkInDate - a.checkInDate);
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
      if (status === 'REJECTED') {
    const isConfirmed = confirm('Apakah Anda yakin ingin menolak pemesanan ini?');
    if (!isConfirmed) {
      return; // Jangan melakukan penolakan jika pengguna membatalkan konfirmasi
    }
  }
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


downloadInvoice(booking: any): void {
 // Menghitung durasi menginap dalam milidetik
  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);
  
  // Menghitung selisih hari antara check-in dan check-out
  const oneDayInMillis = 1000 * 60 * 60 * 24;
  const durationInMillis = checkOutDate.getTime() - checkInDate.getTime();
  let durationInDays = Math.ceil(durationInMillis / oneDayInMillis);

  // Jika durasi adalah 0, set durasi ke 1
  if (durationInDays === 0) {
    durationInDays = 1;
  }
  const invoiceContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kwitansi Pembayaran</title>
      <style>
        /* GLOBAL */
        * {
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
        }
        img {
            max-width: 100%;
        }
        body {
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100%;
            line-height: 1.6;
        }
        /* BODY & CONTAINER */
        .body-wrap {
            background-color: #f6f6f6;
            width: 100%;
        }
        .container {
            display: block !important;
            max-width: 600px !important;
            margin: 0 auto !important;
            clear: both !important;
        }
        .content {
            max-width: 600px;
            margin: 0 auto;
            display: block;
            padding: 20px;
        }
        /* HEADER, FOOTER, MAIN */
        .main {
            background: #fff;
            border: 1px solid #e9e9e9;
            border-radius: 3px;
        }
        .content-wrap {
            padding: 20px;
        }
        .content-block {
            padding: 0 0 20px;
        }
        .header {
            width: 100%;
            margin-bottom: 20px;
        }
        .footer {
            width: 100%;
            clear: both;
            color: #999;
            padding: 20px;
        }
        .footer a {
            color: #999;
        }
        .footer p, .footer a, .footer unsubscribe, .footer td {
            font-size: 12px;
        }
        /* TYPOGRAPHY */
        h1, h2, h3 {
            font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            color: #000;
            margin: 40px 0 0;
            line-height: 1.2;
            font-weight: 400;
        }
        h1 {
            font-size: 32px;
            font-weight: 500;
        }
        h2 {
            font-size: 24px;
        }
        h3 {
            font-size: 18px;
        }
        h4 {
            font-size: 14px;
            font-weight: 600;
        }
        p, ul, ol {
            margin-bottom: 10px;
            font-weight: normal;
        }
        p li, ul li, ol li {
            margin-left: 5px;
            list-style-position: inside;
        }
        /* LINKS & BUTTONS */
        a {
            color: #1ab394;
            text-decoration: underline;
        }
        .btn-primary {
            text-decoration: none;
            color: #FFF;
            background-color: #1ab394;
            border: solid #1ab394;
            border-width: 5px 10px;
            line-height: 2;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            border-radius: 5px;
            text-transform: capitalize;
        }
        /* OTHER STYLES THAT MIGHT BE USEFUL */
        .last {
            margin-bottom: 0;
        }
        .first {
            margin-top: 0;
        }
        .aligncenter {
            text-align: center;
        }
        .alignright {
            text-align: right;
        }
        .alignleft {
            text-align: left;
        }
        .clear {
            clear: both;
        }
        /* ALERTS */
        .alert {
            font-size: 16px;
            color: #fff;
            font-weight: 500;
            padding: 20px;
            text-align: center;
            border-radius: 3px 3px 0 0;
        }
        .alert a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
        }
        .alert.alert-warning {
            background: #f8ac59;
        }
        .alert.alert-bad {
            background: #ed5565;
        }
        .alert.alert-good {
            background: #1ab394;
        }
        /* INVOICE */
        .invoice {
            margin: 40px auto;
            text-align: left;
            width: 80%;
        }
        .invoice td {
            padding: 5px 0;
        }
        .invoice .invoice-items {
            width: 100%;
        }
        .invoice .invoice-items td {
            border-top: #eee 1px solid;
        }
        .invoice .invoice-items .total td {
            border-top: 2px solid #333;
            border-bottom: 2px solid #333;
            font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="body-wrap">
        <table>
          <tr>
            <td></td>
            <td class="container" width="600">
              <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-wrap aligncenter">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <h2>Terima Kasih Telah Mengunjungi Hotel Kami</h2>
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block">
                            <table class="invoice">
                              <tr>
                                <td text-transform: uppercase;>${booking.userName.toUpperCase()}<br>ID #${booking.id}<br>${new Date(booking.checkInDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                              </tr>
                              <tr>
                                <td>
                                  <table class="invoice-items" cellpadding="0" cellspacing="0">
                                    <tr text-transform: uppercase;>
                                      <td>${booking.serviceName.toUpperCase()} (${durationInDays} hari)</td>
                                      <td class="alignright">${this.formatPrice(booking.totalPrice)}</td>
                                    </tr>
                                      <tr>
                                      <td>Pajak 11%</td>
                                      <td class="alignright">${this.formatPrice(booking.tax)}</td>
                                    </tr>
                                    <!-- Add other rows as needed -->
                                    <tr class="total">
                                      <td class="alignright" width="80%">Total : </td>
                                      <td class="alignright"> ${this.formatPrice(booking.totalPayment)}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block">
                                Durasi Menginap (${durationInDays} hari)
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block">
                            Hotel Bagus 123 Bandar Lampung
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
             
              </div>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;

  const newWindow = window.open('', '_blank');
  newWindow.document.write(invoiceContent);
}

  getApprovedTotalPayment(): number {
  let approvedTotalPayment = 0;
  this.bookings.forEach(booking => {
    if (booking.reservationStatus === 'APPROVED') {
      approvedTotalPayment += booking.totalPayment;
    }
  });
  return approvedTotalPayment;
}


exportToExcel(): void {
  // Filter data hanya untuk pemesanan yang disetujui
  const approvedBookings = this.bookings.filter(booking => booking.reservationStatus === 'APPROVED');

  // Data yang akan diekspor
  const data = approvedBookings.map(booking => ({
    'Nama Client': booking.userName,
    'Ruangan': booking.serviceName,
    'Harga': this.formatPrice(booking.price),
    'Tanggal CheckIn': new Date(booking.checkInDate).toLocaleDateString('en-US'),
    'Tanggal Checkout': new Date(booking.checkOutDate).toLocaleDateString('en-US'),
    'Total Harga': this.formatPrice(booking.totalPrice),
    'Pajak 11%': this.formatPrice(booking.tax),
    'Total Pembayaran + Pajak': this.formatPrice(booking.totalPayment)
  }));

  // Konversi data ke format yang sesuai untuk file Excel
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  // Buat file Excel
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, 'Pendapatan-hotel');
}

saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url: string = window.URL.createObjectURL(data);
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = fileName + '.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

deleteBooking() {
  // Loop melalui semua ID pemesanan dan hapus satu per satu
    const isConfirmed = confirm('Apakah Anda yakin ingin menghapus semua data pemesanan ini?');
  if (!isConfirmed) {
        return; // Jangan melakukan penolakan jika pengguna membatalkan konfirmasi
      }
  this.bookings.forEach(booking => {
    this.companyService.deleteBooking(booking.id).subscribe(
      () => {
        // Notifikasi jika pemesanan berhasil dihapus
        this.notification.success(
          'SUCCESS',
          'Hapus Data Telah Berhasil',
          { nzDuration: 5000 }
        );
        // Perbarui daftar pemesanan setelah pemesanan dihapus
        this.getAllAdBookings();
      },
      error => {
        // Tangani kesalahan jika pemesanan gagal dihapus
        console.error('Failed to delete booking:', error);
        this.notification.error(
          'ERROR',
          'Gagal menghapus data',
          { nzDuration: 5000 }
        );
      }
    );
  });
}

}
