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
  public isClient: Boolean = false;
  public soicitationStatus: any = "";

  constructor(
    private sessions: SessionsClientService,
    private http: RequestApiService
  ) {}

  ngOnInit(): void {
    const session: any = this.sessions.getCurrentSession();
    if (session.es_cliente && this.sessions.isAuthenticated()) {
      this.getContractStatus();
      this.isClient = true;
    } else {
      this.getSolicitationStatus();
    }
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        this.contracts = response.results;
        this.plan = response.results[0].plan;
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
        this.solicitation = response;
        this.plan = response.plan;
        this.soicitationStatus = response.get_status_display
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }
}
