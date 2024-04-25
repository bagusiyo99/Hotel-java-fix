import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  bookedServices: any[] = [];
booking: any;

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

    // Hitung total harga jika check-out date tersedia
    if (item.checkOutDate) {
      // Menghitung durasi pemesanan dalam milidetik
      const durationInMilliseconds = item.checkOutDate.getTime() - item.checkInDate.getTime();
      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

      // Menghitung total harga
      if (durationInDays <= 0) {
        // Jika durasi pemesanan adalah satu hari atau kurang, gunakan harga awal
        item.totalPrice = item.price;
      } else {
        // Jika durasi lebih dari satu hari, hitung total harga berdasarkan harga dan durasi
        item.totalPrice = durationInDays * item.price;
      }

      // Hitung pajak (misalnya, pajak 11%)
      const taxRate = 0.11;
      item.tax = item.totalPrice * taxRate;

      // Hitung total pembayaran (total harga ditambah pajak)
      item.totalPayment = item.totalPrice + item.tax;
    } else {
      // Jika tanggal check-out tidak tersedia, tetapkan total harga dan total pembayaran ke 0
      console.error('Check-out date is missing or invalid:', item);
      item.totalPrice = 0;
      item.tax = 0;
      item.totalPayment = 0;
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
      <title>Booking Invoice</title>
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


downloadAllInvoices(): void {
  // Filter hanya transaksi yang sudah disetujui
  const approvedBookings = this.bookedServices.filter(booking => booking.reservationStatus === 'APPROVED');
let totalPayment = 0;
  approvedBookings.forEach(booking => {
    totalPayment += booking.totalPayment;
  });

    const formattedTotalPayment = this.formatPrice(totalPayment);

     // Ambil nama pelanggan dan ID transaksi dari transaksi pertama yang disetujui
  const firstBooking = approvedBookings[0];
  const customerName = firstBooking.userName.toUpperCase(); // Konversi nama pelanggan menjadi huruf besar
  const bookingId = firstBooking.id;

  // Mulai template HTML
  let allInvoicesContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bukti Boking</title>
       <style>
        body {
            margin: 60px 160px;
            background-color: #f7f7ff;
        }

        #invoice {
            padding: 0px;
        }

        table, th, td {
    text-align: center;
  }

        .invoice {
            position: relative;
            background-color: #FFF;
            min-height: 680px;
            padding: 15px
        }

        .invoice header {
            padding: 10px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #0d6efd
        }

        .invoice .company-details {
            text-align: right
        }

        .invoice .company-details .name {
            margin-top: 0;
            margin-bottom: 0
        }

        .invoice .contacts {
            margin-bottom: 20px
        }

        .invoice .invoice-to {
            text-align: left
        }

        .invoice .invoice-to .to {
            margin-top: 0;
            margin-bottom: 0
        }
        
        .table td {
    text-align: center;
  }

        .invoice .invoice-details {
            text-align: right
        }

        .invoice .invoice-details .invoice-id {
            margin-top: 0;
            color: #0d6efd
        }

        .invoice main {
            padding-bottom: 50px
        }

        .invoice main .thanks {
            margin-top: -100px;
            font-size: 2em;
            margin-bottom: 50px
        }

        .invoice main .notices {
            padding-left: 6px;
            border-left: 6px solid #0d6efd;
            background: #e7f2ff;
            padding: 10px;
        }

        .invoice main .notices .notice {
            font-size: 1.2em
        }

        .invoice table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px
        }

        .invoice table td,
        .invoice table th {
            padding: 15px;
            background: #eee;
            border-bottom: 1px solid #fff
                text-align: center;

        }

        .invoice table th {
            white-space: nowrap;
            font-weight: 400;
            font-size: 16px
        }

        .invoice table td h3 {
            margin: 0;
            font-weight: 400;
            color: #0d6efd;
            font-size: 1.2em
        }

                .invoice table .total{
                    text-align: right;
            font-size: 1.2em
                }

        .invoice table .qty,
        .invoice table .unit {
            text-align: center;
            font-size: 1.2em
        }

        .invoice table .no {
            color: #fff;
            font-size: 1.6em;
            background: #0d6efd
        }

        .invoice table .unit {
            background: #ddd
        }

        .invoice table .total {
            background: #0d6efd;
            color: #fff
        }

        .invoice table tbody tr:last-child td {
            border: none
        }

        .invoice table tfoot td {
            background: 0 0;
            border-bottom: none;
            white-space: nowrap;
            text-align: right;
            padding: 10px 10px;
            font-size: 1.2em;
            border-top: 1px solid #aaa
        }

        .invoice table tfoot tr:first-child td {
            border-top: none
        }

        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 0px solid rgba(0, 0, 0, 0);
            border-radius: .25rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
        }

        .invoice table tfoot tr:last-child td {
            color: #0d6efd;
            font-size: 1.4em;
            border-top: 1px solid #0d6efd
        }

        .invoice table tfoot tr td:first-child {
            border: none
        }

        .invoice footer {
            width: 100%;
            text-align: center;
            color: #777;
            border-top: 1px solid #aaa;
            padding: 8px 0
        }

        @media print {
            .invoice {
                font-size: 11px !important;
                overflow: hidden !important
            }

            .invoice footer {
                position: absolute;
                bottom: 10px;
                page-break-after: always
            }

            .invoice>div:last-child {
                page-break-before: always
            }
        }

        .invoice main .notices {
            padding-left: 6px;
            border-left: 6px solid #0d6efd;
            background: #e7f2ff;
            padding: 10px;
        }
    </style>
    </head>
    <body>
      <!-- Mulai template invoice -->
      <div class="invoice">
        <header>
          <div class="row">
            <div class="col">
              <a href="javascript:;">
                <img src="assets/images/logo-icon.png" width="80" alt="">
              </a>
            </div>
            <div class="col company-details">
              <h2 class="name">
                <a target="_blank" href="javascript:;">
                  Bagus
                </a>
              </h2>
              <div>Jl. jalan apa aja</div>
              <div>(123) 011-000</div>
              <div>bagus@example.com</div>
            </div>
          </div>
        </header>
        <main>
          <!-- Informasi transaksi dan pelanggan -->
          <div class="row contacts">
            <div class="col invoice-to">
              <div class="text-gray-light">Kwitansi Untuk:</div>
              <h3 class="to text-uppercase">${customerName}</h3>

            </div>
            <div class="col invoice-details">
              <h1 class="invoice-id">ID-${bookingId}</h1>
            </div>
          </div>
          <!-- Tabel detail transaksi -->
          <table>
            <thead>
              <tr>
                <th class="text-center">No</th>
                <th class="text-center">Nama Ruangan</th>
                <th class="text-center">Jumlah Hari</th>
                <th class="text-center">Harga Harian</th>
                <th class="text-center">Total Harga</th>
                <th class="text-center">Pajak 11%</th>
                <th class="text-center">Total Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop melalui transaksi yang disetujui dan tambahkan detail invoice -->
              ${this.generateInvoiceRows(approvedBookings)}
            </tbody>
              <tfoot>
              <!-- ... Bagian lain dari kode HTML ... -->

                
                  <td colspan="5"></td>
                  <td>Total Pembayaran Keseluruhan + Pajak 11%</td>
                  <td> ${formattedTotalPayment}</td>
                 </tr>

            </tfoot>
           
          </table>
          <!-- Pesan terima kasih dan pemberitahuan -->
          <div class="notices">
            <div>Pemberitahuan:</div>
            <div class="notice"> Silahkan Menunjukan ini ke kasir untuk melanjutkan pembayaran </div>
          </div>
        </main>
        <footer>Desain by Bootdey.com
</footer>
      </div>
    </body>
    </html>
  `;

  // Buka jendela baru untuk menampilkan faktur keseluruhan
  const newWindow = window.open('', '_blank');
  newWindow.document.write(allInvoicesContent);
}

// Fungsi untuk menghasilkan baris-baris detail invoice
generateInvoiceRows(bookings): string {
  let rows = '';
  bookings.forEach((booking, index) => {
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    const durationInMillis = checkOutDate.getTime() - checkInDate.getTime();
    let durationInDays = Math.ceil(durationInMillis / oneDayInMillis);
    if (durationInDays === 0) {
      durationInDays = 1;
    }

    
    rows += `
      <tr>
        <td class="no text-center">${index + 1}</td>
        <td class="unit text-center">${booking.serviceName}</td>
        <td class="text-center text-uppercase">${durationInDays} hari</td>
        <td class="unit text-center">${this.formatPrice(booking.price)}</td>
        <td class="text-center text-uppercase">${this.formatPrice(booking.totalPrice)}</td>
        <td class="unit text-center">${this.formatPrice(booking.tax)}</td>

        <td class="total text-center">${this.formatPrice(booking.totalPayment)}</td>
      </tr>
    `;
  });

  return rows;
}






getApprovedTotalPayment(): number {
  // Filter hanya pemesanan yang sudah disetujui
  const approvedBookings = this.bookedServices.filter(booking => booking.reservationStatus === 'APPROVED');

  // Menghitung total pembayaran dari pemesanan yang sudah disetujui
  const totalPayment = approvedBookings.reduce((accumulator, booking) => accumulator + booking.totalPayment, 0);

  return totalPayment;
}

}
