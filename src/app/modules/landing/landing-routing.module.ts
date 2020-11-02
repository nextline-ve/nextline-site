import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing.component';
import {PrivacyPoliciesComponent} from './pages/privacy-policies/privacy-policies.component';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'privacy-policies',
        component: PrivacyPoliciesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
