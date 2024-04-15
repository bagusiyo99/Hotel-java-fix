import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  bookedServices:any;
  
  constructor(
    private clientService: ClientService,
     private router: Router,
     private notification :NzNotificationService,
     private fb :FormBuilder,

  ) {}


  ngOnInit() {
    this.getMyBookings();
    
  }


  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res => {
      this.bookedServices = res;
    })
  }
}
