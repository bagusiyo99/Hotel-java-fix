import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { AllArticelsComponent } from './pages/all-articels/all-articels.component';
import { CreateArticelsComponent } from './pages/create-articels/create-articels.component';
// import { UpdateArticelsComponent } from './pages/update-articels/update-articels.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateArticelsComponent } from './pages/update-articels/update-articels.component';


@NgModule({
  declarations: [
  
    AllArticelsComponent,
       CreateArticelsComponent,
       UpdateArticelsComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
