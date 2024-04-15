import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-create-articels',
  templateUrl: './create-articels.component.html',
  styleUrls: ['./create-articels.component.scss']
})
export class CreateArticelsComponent {
 validateForm!:FormGroup;

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

    
  constructor (
    private blogService: BlogService,
     private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router
     ){}


  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  //01.51
  postArticle(){
    const formData: FormData = new FormData();

    formData.append('img', this.selectedFile);
    formData.append('title', this.validateForm.get('title').value);
    formData.append('description', this.validateForm.get('description').value);

    this.blogService.postArticle(formData).subscribe(res => {
      this.notification.success(
        'SUCCESS',
        ' Tambahkan Data Berhasil',
        {nzDuration : 5000}
      );
      this.router.navigateByUrl('/blog/articles');
    },eror =>{
  this.notification.error(
        'ERROR',
        '${eror.eror}',
        {nzDuration : 5000}
      );
  })
}
}