import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDasbhboardComponent } from './pages/company-dasbhboard/company-dasbhboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';
import { InvoiceCompanyComponent } from './pages/invoice-company/invoice-company.component';
import { PesananComponent } from './pages/pesanan/pesanan.component';


const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'dashboard', component: CompanyDasbhboardComponent },
  { path: 'ad', component: CreateAdComponent },
  { path: 'ads', component: AllAdsComponent },
  { path: 'update/:id', component: UpdateAdComponent },
  { path: 'invoice-company', component: InvoiceCompanyComponent },
  { path: 'boking', component: PesananComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
