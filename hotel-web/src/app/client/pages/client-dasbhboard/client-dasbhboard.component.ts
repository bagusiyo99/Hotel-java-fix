import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dasbhboard',
  templateUrl: './client-dasbhboard.component.html',
  styleUrls: ['./client-dasbhboard.component.scss']
})
export class ClientDasbhboardComponent  {
 bookings: any[] = [];

  constructor(
    private clientService: ClientService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings() {
    this.clientService.getMyBookings().subscribe(
      (res: any[]) => {
        this.bookings = res;
      },
      (error: any) => {
        console.error('Error fetching bookings:', error);
        this.notification.error('Error', 'Failed to fetch bookings. Please try again later.');
      }
    );
  }
}


