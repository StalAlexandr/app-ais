import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploaddocComponent} from './uploaddoc/uploaddoc.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
  {path: '', component: UploaddocComponent},
  {path: 'about', component: AboutComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
