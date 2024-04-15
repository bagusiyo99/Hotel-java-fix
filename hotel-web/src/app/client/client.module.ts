import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDasbhboardComponent } from './pages/client-dasbhboard/client-dasbhboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from '../company/company-routing.module';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientDasbhboardComponent,
    AdDetailComponent,
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CompanyRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
