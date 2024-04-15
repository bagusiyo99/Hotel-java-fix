import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { CreateArticelsComponent } from './pages/create-articels/create-articels.component';
import { AllArticelsComponent } from './pages/all-articels/all-articels.component';
import { UpdateArticelsComponent } from './pages/update-articels/update-articels.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
      { path: 'article', component: CreateArticelsComponent },
  { path: 'articles', component: AllArticelsComponent },
  { path: 'update/:id', component: UpdateArticelsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {

}
