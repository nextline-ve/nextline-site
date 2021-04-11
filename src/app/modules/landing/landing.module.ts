import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { PresentationComponent } from './components/presentation/presentation.component';
import { HireNowComponent } from './components/hire-now/hire-now.component';
import { AppComponent } from './components/app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { InfoCompanyComponent } from './components/info-company/info-company.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';
import { LandingPlansComponent } from './components/landing-plans/landing-plans.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyPoliciesComponent } from './pages/privacy-policies/privacy-policies.component';
import { HomeComponent } from './pages/home/home.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    PresentationComponent,
    HireNowComponent,
    AppComponent,
    InfoCompanyComponent,
    LoginModalComponent,
    ForgotPasswordModalComponent,
    LandingPlansComponent,
    FooterComponent,
    PrivacyPoliciesComponent,
    HomeComponent,
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
    SharedModule,
    ScrollToModule.forRoot(),
    MatSidenavModule
  ],
})
export class LandingModule {
}
