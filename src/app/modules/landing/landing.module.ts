import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import { PresentationComponent } from './components/presentation/presentation.component';
import { HireNowComponent } from './components/hire-now/hire-now.component';
import { PlansComponent } from './components/plans/plans.component';
import { AppComponent } from './components/app/app.component';
import {MatIconModule} from '@angular/material/icon';
import { InfoCompanyComponent } from './components/info-company/info-company.component';


@NgModule({
  declarations: [LandingComponent, HeaderComponent, PresentationComponent, HireNowComponent,
    PlansComponent, AppComponent, InfoCompanyComponent],
    imports: [
        CommonModule,
        LandingRoutingModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class LandingModule { }
