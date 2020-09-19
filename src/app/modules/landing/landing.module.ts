import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { HeaderComponent } from "./components/header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { PresentationComponent } from "./components/presentation/presentation.component";
import { HireNowComponent } from "./components/hire-now/hire-now.component";
import { PlansComponent } from "./components/plans/plans.component";
import { AppComponent } from "./components/app/app.component";
import { MatIconModule } from "@angular/material/icon";
import { InfoCompanyComponent } from "./components/info-company/info-company.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    PresentationComponent,
    HireNowComponent,
    // PlansComponent,
    AppComponent,
    InfoCompanyComponent,
    LoginModalComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class LandingModule {}
