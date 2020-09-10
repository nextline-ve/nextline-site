import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChangePlanComponent } from "./pages/change-plan/change-plan.component";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
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
import { HomeComponent } from './pages/home/home.component';
import { CurrentPlanComponent } from './components/current-plan/current-plan.component';
import { TechnicalAssitanceComponent } from './components/technical-assitance/technical-assitance.component';
import { BillsComponent } from './components/bills/bills.component';
import { PlanSpeedBoxComponent } from './components/plan-speed-box/plan-speed-box.component';
import { PlanPriceBoxComponent } from './components/plan-price-box/plan-price-box.component';
import { PlanDateBoxComponent } from './components/plan-date-box/plan-date-box.component';
import { TicketItemBoxComponent } from './components/ticket-item-box/ticket-item-box.component';
import { StatusBoxComponent } from './components/status-box/status-box.component';
import { BillItemBoxComponent } from './components/bill-item-box/bill-item-box.component';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import {MatSelectModule} from '@angular/material/select';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

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
  ],
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
    MatSelectModule,
  ],
})
export class DashboardModule {}
