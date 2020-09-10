import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ChangePlanComponent } from "./pages/change-plan/change-plan.component";
import { HomeComponent } from "./pages/home/home.component";
import { CreateTicketComponent } from "./pages/create-ticket/create-ticket.component";
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: "", redirectTo: "/panel/home", pathMatch: "full" },

  {
    path: "",
    component: NavBarComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "change-plan", component: ChangePlanComponent },
      { path: "create-ticket", component: CreateTicketComponent },
      { path: "ticket-detail", component: TicketDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
