import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicesRequestComponent} from './services-request.component';


const routes: Routes = [
  {path: '', component: ServicesRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRequestRoutingModule { }
