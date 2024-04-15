import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {
  validateForm!: FormGroup;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Fungsi untuk menambahkan iklan
  postAd() {
    if (this.validateForm.valid) {
      const formData: FormData = new FormData();

      // Tambahkan data ke formData
      formData.append('img', this.selectedFile as Blob);
      formData.append('serviceName', this.validateForm.get('serviceName')?.value);
      formData.append('description', this.validateForm.get('description')?.value);
      formData.append('price', this.validateForm.get('price')?.value.toString());

      // Panggil layanan untuk menambahkan iklan
      this.companyService.postAd(formData).subscribe(
        res => {
          // Format harga
          const formattedPrice = new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            style: 'currency',
            currency: 'IDR'
          }).format(this.validateForm.get('price')?.value);

          // Tampilkan notifikasi sukses
          this.notification.success(
            'SUCCESS',
            `Tambahkan Data Berhasil. Harga: ${formattedPrice}`,
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl('/company/ads');
        },
        error => {
          // Tangani kesalahan dan tampilkan notifikasi error
          let errorMessage = 'Terjadi kesalahan';

          if (error?.error?.message) {
            errorMessage = error.error.message;
          } else if (error?.message) {
            errorMessage = error.message;
          }

          this.notification.error(
            'ERROR',
            errorMessage,
            { nzDuration: 5000 }
          );
        }
      );
    } else {
      // Notifikasi error jika form tidak valid
      this.notification.error(
        'ERROR',
        'Form tidak valid. Harap periksa input Anda.',
        { nzDuration: 5000 }
      );
    }
  }
}
