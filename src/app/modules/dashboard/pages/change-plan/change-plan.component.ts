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
    this.getPlans();
    this.getContractStatus();
  }

  async getPlans() {
    this.http.get("config/planes/", null, false).subscribe(
      (res: any) => {
        this.plans = res.results;
        console.log("a", this.plans);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        console.log(
          "getContractStatus response.results[0].plan, getContractStatus",
          response.results[0].plan
        );
        this.currentPlan = response.results[0].plan;
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

    if (this.currentPlan.id == this.selectedPlan) {
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
