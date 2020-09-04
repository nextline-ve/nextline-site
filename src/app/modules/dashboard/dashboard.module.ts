import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChangePlanComponent} from './pages/change-plan/change-plan.component';
import {HomeComponent} from './pages/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavBarLinkComponent } from './components/nav-bar-link/nav-bar-link.component';
import { NavBarLinkDividerComponent } from './components/nav-bar-link-divider/nav-bar-link-divider.component';


@NgModule({
  declarations: [HomeComponent, ChangePlanComponent, NavBarComponent, NavBarLinkComponent, NavBarLinkDividerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class DashboardModule { }
