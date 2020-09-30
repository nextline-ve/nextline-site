import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChangePlanComponent } from "./pages/change-plan/change-plan.component";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { NavBarLinkComponent } from "./components/nav-bar-link/nav-bar-link.component";
import { NavBarLinkDividerComponent } from "./components/nav-bar-link-divider/nav-bar-link-divider.component";
import { HomeComponent } from "./pages/home/home.component";
import { CurrentPlanComponent } from "./components/current-plan/current-plan.component";
import { TechnicalAssitanceComponent } from "./components/technical-assitance/technical-assitance.component";
import { BillsComponent } from "./components/bills/bills.component";
import { PlanSpeedBoxComponent } from "./components/plan-speed-box/plan-speed-box.component";
import { PlanPriceBoxComponent } from "./components/plan-price-box/plan-price-box.component";
import { PlanDateBoxComponent } from "./components/plan-date-box/plan-date-box.component";
import { TicketItemBoxComponent } from "./components/ticket-item-box/ticket-item-box.component";
import { StatusBoxComponent } from "./components/status-box/status-box.component";
import { BillItemBoxComponent } from "./components/bill-item-box/bill-item-box.component";
import { CreateTicketComponent } from "./pages/create-ticket/create-ticket.component";
import { MatSelectModule } from "@angular/material/select";
import { TicketDetailComponent } from "./pages/ticket-detail/ticket-detail.component";
import { ChatComponent } from "./pages/chat/chat.component";
import { ChatItemComponent } from "./components/chat-item/chat-item.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TechnicalAssitancePageComponent } from "./pages/technical-assitance-page/technical-assitance-page.component";
import { BillsPageComponent } from "./pages/bills-page/bills-page.component";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "src/environments/environment.prod";
import { SharedModule } from '../shared/shared.module';
import { SuccessMessageComponent } from './pages/success-message/success-message.component';
import { PlanDetailComponent } from './pages/plan-detail/plan-detail.component';
import { BillDetailComponent } from './pages/bill-detail/bill-detail.component';
import { SelectPaymentTypeComponent } from './pages/select-payment-type/select-payment-type.component';
import { DeclarePaymentComponent } from './pages/declare-payment/declare-payment.component';
import { PaymentTypeItemComponent } from './components/payment-type-item/payment-type-item.component';
import { SelectPaymentModalComponent } from './components/select-payment-modal/select-payment-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    ChangePlanComponent,
    NavBarComponent,
    NavBarLinkComponent,
    NavBarLinkDividerComponent,
    HomeComponent,
    CurrentPlanComponent,
    TechnicalAssitanceComponent,
    BillsComponent,
    PlanSpeedBoxComponent,
    PlanPriceBoxComponent,
    PlanDateBoxComponent,
    TicketItemBoxComponent,
    StatusBoxComponent,
    BillItemBoxComponent,
    CreateTicketComponent,
    TicketDetailComponent,
    ChatComponent,
    ChatItemComponent,
    ProfileComponent,
    TechnicalAssitancePageComponent,
    BillsPageComponent,
    SuccessMessageComponent,
    PlanDetailComponent,
    BillDetailComponent,
    SelectPaymentTypeComponent,
    DeclarePaymentComponent,
    PaymentTypeItemComponent,
    SelectPaymentModalComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    SharedModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    TextMaskModule
  ],
})
export class DashboardModule {}
