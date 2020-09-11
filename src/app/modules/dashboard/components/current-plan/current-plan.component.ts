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
  public plan;
  public cliente;
  public solicitation: any = null;
  public contracts: any = [];


  constructor(
    private sessions: SessionsClientService,
    private http: RequestApiService
  ) {}

  ngOnInit(): void {
    const session: any = this.sessions.getCurrentSession();
    if (session.es_cliente && session.isAuthenticated()) {
      this.getContractStatus();
    } else {
      this.getSolicitationStatus();
    }
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        console.log("response, getContractStatus", response);
        this.contracts = response.results;
        console.log(this.contracts);
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
        console.log("response, getSolicitationStatus", response);
        this.solicitation = response;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }
}
