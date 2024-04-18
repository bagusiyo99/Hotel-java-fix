import { Component } from '@angular/core';
import { UserStorageService } from '../basic/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-company',
  templateUrl: './navbar-company.component.html',
  styleUrls: ['./navbar-company.component.scss']
})
export class NavbarCompanyComponent {

      isClientLoggedIn: boolean = UserStorageService.isClientLoggein();
  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggein();

  constructor(private router: Router){}

  ngOnInit() {
    this.router.events.subscribe(event =>{
      this.isClientLoggedIn =  UserStorageService.isClientLoggein();
      this.isCompanyLoggedIn =  UserStorageService.isCompanyLoggein();
    })
    
  }
  loguut(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
