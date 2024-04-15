import { Component } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-articels',
  templateUrl: './all-articels.component.html',
  styleUrls: ['./all-articels.component.scss']
})
export class AllArticelsComponent {
 articles: any;

  constructor(
    private blogService: BlogService,
     private router: Router,
     private notification :NzNotificationService,
  ) {}

  ngOnInit() {
    this.getAllArticlesByUserId();   
  }

  getAllArticlesByUserId() {
    this.blogService.getAllArticlesByUserId().subscribe(res => {
      this.articles = res;
    });
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }
  // Metode untuk mengarahkan pengguna ke halaman update  dengan ID yang sesuai
  updateArticle(articleId: any) {
    this.router.navigate(['/blog/update', articleId]); // Navigasi ke halaman update dengan ID 
  }

deleteArticle(articleId: any) {
  this.blogService.deleteArticle(articleId).subscribe(
    res => { 
      this.notification.success(
        'SUCCESS',
        'Hapus Data Telah Berhasil', 
        { nzDuration: 5000 }
      );
      this.getAllArticlesByUserId();
    },
    error => {
      // Tangani kesalahan jika ada
      console.error('Failed to delete ad:', error);
      this.notification.error(
        'ERROR',
        'Gagal menghapus data',
        { nzDuration: 5000 }
      );
    }
  );
}
}
