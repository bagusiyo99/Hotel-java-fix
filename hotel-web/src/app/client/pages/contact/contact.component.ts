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
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }


  postContact(){
  if (!this.isPosting) {
    this.isPosting = true; // Mengatur status posting menjadi true

    const formData: FormData = new FormData();
    formData.append('name', this.validateForm.get('name').value);
    formData.append('address', this.validateForm.get('address').value);
    formData.append('description', this.validateForm.get('description').value);

    this.clientService.postContact(formData).subscribe(
      res => {
        this.notification.success(
          'SUCCESS',
          'Tambahkan Data Berhasil',
          { nzDuration: 5000 }
        );
        this.router.navigateByUrl('/client/contact');
      },
      error => {
        this.notification.error(
          'ERROR',
          error?.error?.message || 'Terjadi kesalahan',
          { nzDuration: 5000 }
        );
      }
    ).add(() => {
      this.isPosting = false; // Setelah selesai, kembalikan status posting ke false
    });
  }
}

}
