import { Component, OnInit } from "@angular/core";
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
  public selectedPlan = null;

  constructor(
    private http: RequestApiService,
    private session: SessionsClientService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getPlans();
  }

  async getPlans() {
    this.http.get("config/planes/", null, false).subscribe(
      (res: any) => {
        this.plans = res.results;
      },
      (err) => {
        console.error(err);
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
  }
}
