import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = 

[
        { path: '', component:LandingPageComponent },

      { path: 'login', component:LoginComponent },
    { path: 'register_client', component:SignupClientComponent },
    { path: 'register_company', component:SignupCompanyComponent },
    { path: 'register', component:SignupComponent },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },

{ path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
