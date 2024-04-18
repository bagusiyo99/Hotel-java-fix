import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NavbarCompanyComponent } from './navbar-company/navbar-company.component';
import { FooterCompanyComponent } from './footer-company/footer-company.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupClientComponent,
    SignupCompanyComponent,
    LandingPageComponent,
    NavbarCompanyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSpinModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule, // Remove the comma here,
        NgxDatatableModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
