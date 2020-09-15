import { Component, OnInit } from "@angular/core";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-current-plan",
  templateUrl: "./current-plan.component.html",
  styleUrls: ["./current-plan.component.scss"],
})
export class CurrentPlanComponent implements OnInit {
  public plan: any = {};
  public solicitation: any = null;
  public contracts: any = [];
  public datePlan;

  constructor(
    private sessions: SessionsClientService,
    private http: RequestApiService
  ) {}

  ngOnInit(): void {
    const session: any = this.sessions.getCurrentSession();
    if (session.es_cliente && this.sessions.isAuthenticated()) {
      this.getContractStatus();
    } else {
      this.getSolicitationStatus();
    }
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        console.log(
          "response.results[0].plan, getContractStatus",
          response.results[0].plan
        );
        this.contracts = response.results;
        this.plan = response.results[0].plan;
        // console.log(this.contracts);
        console.log("response", response.results[0]);
        this.datePlan = response.results[0].dia_corte;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async getSolicitationStatus() {
    this.http.get("admon/solicitud-status", null, true).subscribe(
      (response: any) => {
        // console.log("response, getSolicitationStatus", response);
        this.solicitation = response;
        this.plan = response.plan;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }
}
