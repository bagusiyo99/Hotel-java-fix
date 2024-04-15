import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.scss']
})
export class SignupCompanyComponent {
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
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null],
      password: ["", [Validators.required, ]],
      checkPassword: ["", Validators.required],
    });
  }

  
submitForm() {
    this.authService.registerCompany(this.validateForm.value).subscribe(
        res => {
            this.notification.success("Selamat", "Kamu telah terdaftar", { nzDuration: 5000 });
            this.router.navigateByUrl('/login');
        },
        error => {
            this.notification.error("eror", "Kamu belum terdaftar", { nzDuration: 5000 });
        }
    );
}

}
