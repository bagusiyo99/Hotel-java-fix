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

  bookService() {
  const checkInDate = this.validateForm.get(['checkInDate']).value;
  const checkOutDate = this.validateForm.get(['checkOutDate']).value;

  // Pastikan checkOutDate dan checkInDate memiliki nilai dan dalam format yang benar
  if (!checkInDate || !checkOutDate || !(checkInDate instanceof Date) || !(checkOutDate instanceof Date)) {
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

  // Hitung total harga berdasarkan durasi dan harga per hari
  const totalPrice = durationInDays * this.ad.price;

  const bookServiceDto = {
    checkInDate,
    checkOutDate,
    adId: this.adId,
    userId: UserStorageService.getUserId(),
    totalPrice  // Sertakan total harga dalam DTO
  };

  // Kirim DTO ke layanan booking
  this.clientService.bookService(bookServiceDto).subscribe(
    res => {
      this.notification.success(
        'SUCCESS',
        'Booking berhasil',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/client/bookings');
    },
    error => {
      this.notification.error(
        'ERROR',
        error.error,
        { nzDuration: 5000 }
      );
    }
  );
}

}
