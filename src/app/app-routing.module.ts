import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) },
  { path: 'service-request', loadChildren: () => import(
    './modules/services-request/services-request.module'
      ).then(m => m.ServicesRequestModule) },
  {path: 'auth', loadChildren:  () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'panel', loadChildren:  () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
