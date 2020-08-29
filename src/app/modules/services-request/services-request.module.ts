import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRequestRoutingModule } from './services-request-routing.module';
import { ServicesRequestComponent } from './services-request.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ServicesRequestComponent],
  imports: [
    CommonModule,
    ServicesRequestRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule
  ],
})
export class ServicesRequestModule { }
