import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDasbhboardComponent } from './pages/client-dasbhboard/client-dasbhboard.component';
import { ClientComponent } from './client.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { PostinganComponent } from './pages/postingan/postingan.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'postingan', component: PostinganComponent },
  { path: 'dashboard', component: ClientDasbhboardComponent },
  { path: 'bookings', component: MyBookingsComponent },
  { path: 'pesanan/:adId', component: AdDetailComponent },
  { path: 'contact', component: ContactComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
