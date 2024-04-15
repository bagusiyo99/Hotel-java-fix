import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDasbhboardComponent } from './pages/client-dasbhboard/client-dasbhboard.component';
import { ClientComponent } from './client.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'dashboard', component: ClientDasbhboardComponent },
  { path: 'bookings', component: MyBookingsComponent },
  { path: 'ad/:adId', component: AdDetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
