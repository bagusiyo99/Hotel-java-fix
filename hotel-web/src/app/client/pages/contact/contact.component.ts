import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
 validateForm!:FormGroup;
 isPosting: boolean = false; // Menyimpan status posting/ agar tidak double klik


   
  constructor (
    private clientService: ClientService,
     private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router
     ){}


  ngOnInit() {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.min(12)]],
      address: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }


postContact() {
  // Mengatur status posting menjadi true
  if (!this.isPosting) {
    this.isPosting = true;

    const phoneValue = this.validateForm.get('phone').value;
    // Validasi panjang nomor WhatsApp
    if (phoneValue.length < 12 || phoneValue.length > 13) {
      this.notification.error(
        'ERROR',
        'Nomor Whatsapp harus terdiri dari 12 hingga 13 digit',
        { nzDuration: 5000 }
      );
      this.isPosting = false; // Mengembalikan status posting ke false
      return; // Menghentikan eksekusi jika validasi gagal
    }

    // Jika validasi berhasil, lanjutkan dengan pengiriman data ke server
    const formData: FormData = new FormData();
    formData.append('phone', phoneValue);
    formData.append('address', this.validateForm.get('address').value);
    formData.append('description', this.validateForm.get('description').value);

    this.clientService.postContact(formData).subscribe(
      res => {
        this.notification.success(
          'SUCCESS',
          'Tambahkan Data Berhasil',
          { nzDuration: 5000 }
        );
        this.validateForm.reset(); // Mengosongkan formulir setelah pengiriman data berhasil
        this.isPosting = false; // Setelah selesai, kembalikan status posting ke false
      },
      error => {
        this.notification.error(
          'ERROR',
          error?.error?.message || 'Terjadi kesalahan',
          { nzDuration: 5000 }
        );
        this.isPosting = false; // Setelah selesai, kembalikan status posting ke false
      }
    );
  }
}

}
