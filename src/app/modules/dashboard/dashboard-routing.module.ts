import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ChangePlanComponent } from "./pages/change-plan/change-plan.component";
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/panel/home', pathMatch: 'full' },

  {
    path: "",
    component: NavBarComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "change-plan", component: ChangePlanComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
