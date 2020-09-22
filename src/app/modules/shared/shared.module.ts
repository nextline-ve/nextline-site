import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlansComponent } from "../services-request/components/plans/plans.component";

@NgModule({
  declarations: [PlansComponent],
  imports: [CommonModule],
  exports: [PlansComponent],
})
export class SharedModule {}
