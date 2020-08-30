import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [LandingComponent, HeaderComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatButtonModule
  ]
})
export class LandingModule { }
