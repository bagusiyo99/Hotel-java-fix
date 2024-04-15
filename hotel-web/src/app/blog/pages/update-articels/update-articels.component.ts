import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-update-articels',
  templateUrl: './update-articels.component.html',
  styleUrls: ['./update-articels.component.scss']
})
export class UpdateArticelsComponent {
articleId:any = this.activatedroute.snapshot.params['id'];

 

  validateForm!:FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage:string | null = null;

  imgChanged = false;

    
  constructor (
    private blogService: BlogService,
     private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router,
         private activatedroute:ActivatedRoute

     ){}


  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  this.getArticleById(); // Memanggil metode dengan menggunakan ()
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

  
updateArticle() {
  const formData: FormData = new FormData();

  // Periksa apakah gambar telah diubah
  if (this.imgChanged && this.selectedFile) {
    formData.append('img', this.selectedFile);
  }

  // Tambahkan data lain ke formData
  formData.append('title', this.validateForm.get('title').value);
  formData.append('description', this.validateForm.get('description').value);

  this.blogService.updateArticle(this.articleId, formData).subscribe(
    res => {
      this.notification.success(
        'SUCCESS',
        'Data berhasil diperbarui',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/blog/articles');
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


  
  
  getArticleById(){
    this.blogService.getArticleById(this.articleId).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64, ' + res.returnedImg;
    })
  }

}
