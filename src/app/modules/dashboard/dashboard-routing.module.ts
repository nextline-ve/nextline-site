import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ChangePlanComponent } from "./pages/change-plan/change-plan.component";
import { HomeComponent } from "./pages/home/home.component";
import { CreateTicketComponent } from "./pages/create-ticket/create-ticket.component";
import { TicketDetailComponent } from "./pages/ticket-detail/ticket-detail.component";
import { ChatComponent } from "./pages/chat/chat.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TechnicalAssitancePageComponent } from './pages/technical-assitance-page/technical-assitance-page.component';
import { BillsPageComponent } from './pages/bills-page/bills-page.component';
import { PlanDetailComponent } from './pages/plan-detail/plan-detail.component';
import { SuccessMessageComponent } from './pages/success-message/success-message.component';

const routes: Routes = [
  { path: "", redirectTo: "/panel/home", pathMatch: "full" },

  {
    path: "",
    component: NavBarComponent,
    children: [
      { path: "bills", component: BillsPageComponent },
      { path: "change-plan", component: ChangePlanComponent },
      { path: "change-plan/plan-detail", component: PlanDetailComponent },
      { path: "change-plan/success-message", component: SuccessMessageComponent },
      { path: "chat/:id", component: ChatComponent },
      { path: "create-ticket", component: CreateTicketComponent },
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "ticket-detail", component: TicketDetailComponent },
      { path: "technical-assitance", component: TechnicalAssitancePageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
