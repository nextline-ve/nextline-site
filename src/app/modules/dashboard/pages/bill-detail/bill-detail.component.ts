import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";
import { UtilsService } from "src/app/services/utils.service";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.scss"],
})
export class BillDetailComponent implements OnInit {
  public billId = null;
  public bill: any = {};
  public domain = environment.DOMAIN;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: RequestApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      console.log(res.params);
      this.billId = res.params.id;
      this.loadBill();
    });
  }

  loadBill() {
    this.http.get(`admon/factura/${this.billId}`, null, true).subscribe(
      (response: any) => {
        console.log("loadBill", response);
        this.bill = response;
        this.formatDate();
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  formatDate() {
    this.bill.fecha_emision = this.utils.calculatePaymentDay(
      this.bill.fecha_emision
    );
  }

  downloadBill() {
    this.http.get(`admon/factura/${this.billId}`, null, true).subscribe(
      (response: any) => {
        console.log("downloadBill", response.results);
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  payBill(method) {
    this.router.navigate(["/panel/bills/declare-payment"], {
      queryParams: { method, bill: this.billId },
    });
  }
}
