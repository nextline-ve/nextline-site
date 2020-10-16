import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";
import { UtilsService } from "src/app/services/utils.service";
import { environment } from "../../../../../environments/environment";
import { PaymentCommitmentModalComponent } from '../../components/payment-commitment-modal/payment-commitment-modal.component';

@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.scss"],
})
export class BillDetailComponent implements OnInit {
  public billId = null;
  public bill: any = {};
  public currencies = [];
  public domain = environment.DOMAIN;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private http: RequestApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((res: any) => {
    //   console.log(res.params);
    //   this.billId = res.params.id;
    //   this.loadBill();
    //   this.loadCurrencies();
    // });
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      this.billId = res.id;
      this.bill = res;
      this.formatDate();
      this.loadCurrencies();
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

  loadCurrencies(){
    this.http.get(`config/monedas/`, null, true).subscribe(
      (response: any) => {
        console.log("loadCurrencies", response);
        this.currencies = response.results;
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
      queryParams: { 
        method, 
        bill: this.billId 
      },
    });
  }

  showPaymentCommitmentModal(){
    const dialogForgotRef = this.dialog.open(PaymentCommitmentModalComponent, {
      width: "420px",
      data: {
        billId: this.billId,
      },
    });
  }
}
