import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {

  adId = this.activatedroute.snapshot.params['adId'];
  avatarUrl: any;
  ad: any;
    isSubmitting: boolean = false; // Flag untuk melacak status permintaan

  validateForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    // Buat form dengan validasi kustom
    this.validateForm = this.fb.group({
      checkInDate: [null, [Validators.required]],
      checkOutDate: [null, [Validators.required]]
    }, {
      validator: this.dateValidator // Tambahkan validasi kustom
    });

    this.getAdDetailsByAdId();
  }

  getAdDetailsByAdId() {
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res => {
      console.log(res);
      if (res && res.adDTO && res.adDTO.returnedImg !== "") {
        this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
        this.ad = res.adDTO;
      } else {
        console.error('ReturnedImg is empty or null:', res);
      }
    });
  }

  // Validasi kustom untuk memastikan checkInDate lebih awal dari checkOutDate
  dateValidator: Validators = (formGroup: FormGroup): { [key: string]: any } | null => {
    const checkInDate = formGroup.get('checkInDate');
    const checkOutDate = formGroup.get('checkOutDate');

    if (checkInDate && checkOutDate && checkInDate.value >= checkOutDate.value) {
      return { dateMismatch: true };
    }

    return null;
  };

  // Validasi untuk memastikan tanggal check-in tidak lebih awal dari hari ini
  futureOrTodayValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate < today) {
      return { dateInvalid: true };
    }

    return null;
  }

 bookService() {
    const checkInDate = this.validateForm.get(['checkInDate']).value;
    const checkOutDate = this.validateForm.get(['checkOutDate']).value;

    // Validasi tanggal check-in
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set ke awal hari ini (untuk memeriksa hanya tanggal)
    if (checkInDate < today) {
        this.notification.error(
            'ERROR',
            'Tanggal Check-in harus mulai dari hari ini atau di masa depan.',
            { nzDuration: 5000 }
        );
        return;
    }

    // Validasi tanggal check-out
    if (checkOutDate < checkInDate) {
        this.notification.error(
            'ERROR',
            'Tanggal Check-out tidak boleh lebih awal dari tanggal Check-in.',
            { nzDuration: 5000 }
        );
        return;
    }

    // Pastikan tanggal check-in dan check-out adalah objek Date yang valid
    if (!(checkInDate instanceof Date) || !(checkOutDate instanceof Date)) {
        this.notification.error(
            'ERROR',
            'Tanggal Check-out atau Check-in tidak valid',
            { nzDuration: 5000 }
        );
        return;
    }

    // Menghitung durasi dalam milidetik dan kemudian mengonversinya ke hari
    const durationInMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

    // Tentukan total harga berdasarkan durasi pemesanan
    let totalPrice;
    if (durationInDays < 1) {
        totalPrice = this.ad.price; // Jika durasi < 1 hari, gunakan harga awal
    } else {
        totalPrice = durationInDays * this.ad.price; // Jika durasi >= 1 hari, hitung total harga
    }

    const bookServiceDto = {
        checkInDate,
        checkOutDate,
        adId: this.adId,
        userId: UserStorageService.getUserId(),
        totalPrice
    };

    // Set flag `isSubmitting` ke true untuk menandai permintaan sedang berlangsung
    this.isSubmitting = true;

    // Kirim DTO ke layanan pemesanan
    this.clientService.bookService(bookServiceDto).subscribe(
        res => {
            // Setelah permintaan berhasil, set flag `isSubmitting` ke false
            this.isSubmitting = false;
            this.notification.success(
                'SUCCESS',
                'Booking berhasil',
                { nzDuration: 5000 }
            );
            this.router.navigateByUrl('/client/bookings');
        },
        error => {
            // Jika terjadi kesalahan, set flag `isSubmitting` ke false
            this.isSubmitting = false;
            this.notification.error(
                'ERROR',
                error.error,
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
