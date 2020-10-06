import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";

@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.scss"],
})
export class BillDetailComponent implements OnInit {
  public billId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: RequestApiService
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
        console.log("loadBill", response.results);
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
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
