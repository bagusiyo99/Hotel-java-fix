import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDasbhboardComponent } from './pages/company-dasbhboard/company-dasbhboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';




@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDasbhboardComponent,
    CreateAdComponent,
    AllAdsComponent,
    UpdateAdComponent,

    
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
