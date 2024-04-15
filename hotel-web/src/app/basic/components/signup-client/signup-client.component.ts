import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NzFormModule


@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent {
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
      lastname: [null, [Validators.required]],
      phone: [null],
      password: ["", [Validators.required, ]],
      checkPassword: ["", Validators.required],
    });
  }

  
submitForm() {
    this.authService.registerClient(this.validateForm.value).subscribe(
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
