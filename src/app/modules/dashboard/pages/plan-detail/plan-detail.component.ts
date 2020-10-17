import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-plan-detail",
  templateUrl: "./plan-detail.component.html",
  styleUrls: ["./plan-detail.component.scss"],
})
export class PlanDetailComponent implements OnInit {
  public plan: any = {};
  public cliente: any = {};
  public isLoading = false;
  public dateFormated = null;

  constructor(
    private route: ActivatedRoute,
    private http: RequestApiService,
    private utils: UtilsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.plan = res;
      this.getContractStatus();
    });
    const user: any = await localStorage.getItem("nextline-currentClient");
    this.cliente = JSON.parse(user);
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        this.formatDate(response.results[0].dia_corte);
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  formatDate(day) {
    this.dateFormated = this.utils.calculatePaymentDay(day);
  }

  comfirm() {
    this.isLoading = true;

    let obj = {
      plan_id: Number(this.plan.id),
    };
    this.http.post("support/cambiar-plan/", obj, true).subscribe(
      (response: any) => {
        this.isLoading = false;

        const obj = {
          title: "Su cambio de plan esta en proceso",
          icon: "success-plan-change.png",
        };

        this.router.navigate(["/panel/change-plan/success-message"], {
          queryParams: obj,
        });
      },
      (error) => {
        console.log(error.error);
        console.log(error.error.message);
        this.utils.showSnackBar("Error al hacer la solicitud", 10000);
        this.isLoading = false;
      }
    );
  }
}
