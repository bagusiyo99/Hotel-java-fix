import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
contacts: any[] = []; // Assuming contacts will be stored in an array

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllContact(); // Fetch contacts when the component initializes
  }

  getAllContact(): void {
    this.companyService.getAllContact().subscribe(
      
      (res) => {
      this.contacts = res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Assign the fetched contacts to the 'contacts' property
        this.contacts = res;
      },
      (error) => {
        console.error('Failed to load contacts:', error);
        // Handle error here, e.g., display a message to the user
      }
    );
  }
}
