import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ServicesRequestRoutingModule } from "./services-request-routing.module";
import { ServicesRequestComponent } from "./services-request.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ServicesComponent } from "./components/services/services.component";
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.prod';
import { AddressMapComponent } from './components/address-map/address-map.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ServicesRequestComponent, ServicesComponent,  AddressMapComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServicesRequestRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_KEY
    }),
  ],
})
export class ServicesRequestModule {}
