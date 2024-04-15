import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!:FormGroup;

  //38.37
  
  constructor (
    private authService: AuthService,
     private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router
     ){}

        ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, ]],
    });
  }

  
submitForm() {
  // Memeriksa apakah formulir sudah valid sebelum memproses login
  this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value)
    .subscribe(res => {
      console.log(res);
      if (UserStorageService.isClientLoggein()) {
        this.router.navigateByUrl('client/dashboard'); // Corrected navigation URL
      } else if (UserStorageService.isCompanyLoggein()) {
        this.router.navigateByUrl('company/dashboard'); // Corrected navigation URL
      }
    }, error => {
      this.notification.error('ERROR', 'Username Atau Sandi Salah', { nzDuration: 5000 });
    });
}

    
}



