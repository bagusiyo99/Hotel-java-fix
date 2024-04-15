import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dasbhboard',
  templateUrl: './client-dasbhboard.component.html',
  styleUrls: ['./client-dasbhboard.component.scss']
})
export class ClientDasbhboardComponent {
 ads: any;
  validateForm!:FormGroup;


  constructor(
    private clientService: ClientService,
     private router: Router,
     private notification :NzNotificationService,
     private fb :FormBuilder,

  ) {}

  ngOnInit() {
        this.validateForm = this.fb.group({
      service: [null, [Validators.required]],
    });
    this.getAllAds();   
  }

  getAllAds() {
    this.clientService.getAllAds().subscribe(res => {
      this.ads = res;
    });
  }

  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res => {
      this.ads = res;
    })
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

}
