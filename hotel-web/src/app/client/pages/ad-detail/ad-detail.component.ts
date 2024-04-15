import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent {

  adId = this.activatedroute.snapshot.params['adId'];
  avatarUrl:any;
    ad:any;
 
  validateForm!:FormGroup;

 

    
  constructor (
    private clientService: ClientService,
         private activatedroute:ActivatedRoute,
             private fb :FormBuilder,
     private notification :NzNotificationService,
     private router: Router

     ){}

  ngOnInit() {
    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]],

    });
        this.getAdDetailsByAdId();

  }

  // getAdDetailsByAdId() {
  //   this.clientService.getAdDetailsByAdId(this.adId).subscribe(res =>{
  //     console.log(res);
  //     this.avatarUrl =  'data:image/jpeg;base64,' + res.adDto.returnedImg;
  //     this.ad = res.adDto;
  //   })
  // }

getAdDetailsByAdId() {
  this.clientService.getAdDetailsByAdId(this.adId).subscribe(res => {
    console.log(res);
    if (res && res.adDTO && res.adDTO.returnedImg !== "") {
      this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
      this.ad = res.adDTO;
    } else {
      // Handle the case where returnedImg is empty or null
      console.error('ReturnedImg is empty or null:', res);
    }
  });
}

bookService () {
  const bookServiceDto = {
    bookDate : this.validateForm.get(['bookDate']).value,
    adId : this.adId,
    userId : UserStorageService.getUserId()
  }
   this.clientService.bookService(bookServiceDto).subscribe(
    res => {
      this.notification.success(
        'SUCCESS',
        'Booking berhsail',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/client/bookings');
    },
    error => {
      this.notification.error(
        'ERROR',
        error.error,
        { nzDuration: 5000 }
      );
    })
}






}
