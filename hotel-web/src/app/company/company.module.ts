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

import { NzListModule } from 'ng-zorro-antd/list';
import { FooterCompanyComponent } from '../footer-company/footer-company.component';
import { InvoiceCompanyComponent } from './pages/invoice-company/invoice-company.component';
import { PesananComponent } from './pages/pesanan/pesanan.component';



@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDasbhboardComponent,
    CreateAdComponent,
    AllAdsComponent,
    UpdateAdComponent,
FooterCompanyComponent,
InvoiceCompanyComponent,
PesananComponent,
    
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    NzListModule
  ]
})
export class CompanyModule { }
