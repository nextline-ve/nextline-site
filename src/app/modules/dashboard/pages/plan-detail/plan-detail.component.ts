import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";
import { UtilsService } from "src/app/services/utils.service";
import * as moment from "moment";

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
      console.log(res);
      this.plan = res;
      // to do
      // this.formatDate();
    });
    const user: any = await localStorage.getItem("nextline-currentClient");
    this.cliente = JSON.parse(user);
    console.log("this.cliente", this.cliente);
  }

  formatDate() {
    this.dateFormated = moment(this.plan.fecha_creacion, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );
  }

  comfirm() {
    this.isLoading = true;

    let obj = {
      cliente: this.cliente.id_usuario,
      plan_id: Number(this.plan.id),
    };
    this.http.post("support/cambiar-plan/", obj, true).subscribe(
      (response: any) => {
        console.log("response", response);
        this.isLoading = false;

        this.router.navigate(["/panel/success-message"], {
          queryParams: response,
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
