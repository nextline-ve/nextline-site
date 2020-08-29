import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChangePlanComponent} from './pages/change-plan/change-plan.component';
import {HomeComponent} from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent, ChangePlanComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
