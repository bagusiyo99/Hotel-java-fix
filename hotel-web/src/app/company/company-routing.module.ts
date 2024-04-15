import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDasbhboardComponent } from './pages/company-dasbhboard/company-dasbhboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { AllAdsComponent } from './pages/all-ads/all-ads.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';


const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'dashboard', component: CompanyDasbhboardComponent },
  { path: 'ad', component: CreateAdComponent },
  { path: 'ads', component: AllAdsComponent },
  { path: 'update/:id', component: UpdateAdComponent },


    // { path: 'blog', component: CreateBlogComponent },
    // { path: 'blogs', component: BlogComponent },
    // { path: 'update/:id', component: UpdateBlogComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
