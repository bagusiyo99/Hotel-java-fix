import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {
  //02.09

  adId:any = this.activatedroute.snapshot.params['id'];

 

  validateForm!:FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage:string | null = null;

  imgChanged = false;

    
  constructor (
    private companyService: CompanyService,
     private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router,
         private activatedroute:ActivatedRoute

     ){}


  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  this.getAdByid(); // Memanggil metode dengan menggunakan ()
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.existingImage = null;
    this.imgChanged = true;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

updateAd() {
  const formData: FormData = new FormData();

  // Periksa apakah gambar telah diubah
  if (this.imgChanged && this.selectedFile) {
    formData.append('img', this.selectedFile);
  }

  // Tambahkan data lain ke formData
  formData.append('serviceName', this.validateForm.get('serviceName').value);
  formData.append('description', this.validateForm.get('description').value);
  formData.append('price', this.validateForm.get('price').value);

  this.companyService.updateAd(this.adId, formData).subscribe(
    res => {
      this.notification.success(
        'SUCCESS',
        'Data berhasil diperbarui',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/company/ads');
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


  
  
  getAdByid(){
    this.companyService.getAdById(this.adId).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64, ' + res.returnedImg;
    })
  }

}
