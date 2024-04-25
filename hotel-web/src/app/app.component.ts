import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from './basic/services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotel-web';

  isClientLoggedIn: boolean = false;
  isCompanyLoggedIn: boolean = false;

  constructor(private router: Router, private notification: NzNotificationService) {}

  ngOnInit() {
    this.updateLoginStatus();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.updateLoginStatus();
        // Check if the user is trying to access a forbidden page
        if (this.isClientLoggedIn && event.url.startsWith('/company')) {
          this.notification.error('Error', 'Kamu tidak punya akses');
          this.router.navigateByUrl('/client/dashboard'); // Redirect back to client dashboard
          this.router.navigateByUrl('/client/postingan'); // Redirect back to client dashboard
          this.router.navigateByUrl('/client/bookings'); // Redirect back to client dashboard
          this.router.navigateByUrl('/client/contact'); // Redirect back to client dashboard
        } else if (this.isCompanyLoggedIn && event.url.startsWith('/client')) {
          this.notification.error('Error', 'Kamu tidak punya akses.');
          this.router.navigateByUrl('/company/dashboard'); // Redirect back to company dashboard
           this.router.navigateByUrl('/company/postingan'); // Redirect back to client dashboard
          this.router.navigateByUrl('/company/booking'); // Redirect back to client dashboard
          this.router.navigateByUrl('/company/contacts'); // Redirect back to client dashboard
        }
      }
    });
  }

  private updateLoginStatus(): void {
    this.isClientLoggedIn = UserStorageService.isClientLoggein();
    this.isCompanyLoggedIn = UserStorageService.isCompanyLoggein();
  }

  loguut(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  logout() {
    if (this.isClientLoggedIn) {
      UserStorageService.signOutClient();
      this.isClientLoggedIn = false;
      this.router.navigate(['/']);
    }
  }
}
