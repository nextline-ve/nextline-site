import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-change-plan",
  templateUrl: "./change-plan.component.html",
  styleUrls: ["./change-plan.component.scss"],
})
export class ChangePlanComponent implements OnInit {
  public plans = [];
  public selectedPlan: any = {};
  public currentPlan: any = {};

  constructor(
    private http: RequestApiService,
    private session: SessionsClientService,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContractStatus();
  }

  async getPlans() {
    console.warn("this.currentPlan.tipo_servicio.id", this.currentPlan.tipo_servicio.id);
    this.http
      .get(
        "config/planes/",
        { tipo_servicio__id: this.currentPlan.tipo_servicio.id },
        true
      )
      .subscribe(
        (res: any) => {
          this.plans = res.results;
          this.setPlan(this.currentPlan);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        this.currentPlan = response.results[0].plan;
        this.getPlans();
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async setPlan(item) {
    this.selectedPlan = item;
  }

  validateSelectedPlan() {
    if (this.selectedPlan == null) {
      this.utils.showSnackBar("Por favor seleccione un plan.");
      return;
    }

    if (this.currentPlan.id == this.selectedPlan.id) {
      this.utils.showSnackBar(
        "Por favor seleccione un plan diferente al actual."
      );
      return;
    }

    this.router.navigate(["/panel/change-plan/plan-detail"], {
      queryParams: this.selectedPlan,
    });
  }
}
