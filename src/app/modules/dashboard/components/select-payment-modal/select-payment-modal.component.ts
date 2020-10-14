import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RequestApiService } from 'src/app/services/request-api.service';

@Component({
  selector: "app-select-payment-modal",
  templateUrl: "./select-payment-modal.component.html",
  styleUrls: ["./select-payment-modal.component.scss"],
})
export class SelectPaymentModalComponent implements OnInit {
  public isReady = false;
  public payments = [{
    id: null,
    banco: "Selecciona un metodo",
    logo_banco:""
  }];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private http: RequestApiService,
    public dialogRef: MatDialogRef<SelectPaymentModalComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.payment) {
      console.log('ok...', this.data.payment);
      this.loadBanks();
    }
  }

  close() {
    this.dialogRef.close();
  }

  selectPayment(payment) {
    this.dialogRef.close({ ...payment });
  }

  async loadBanks() {
    this.http.get("config/bancos/", {tipo_moneda: this.data.payment}, true).subscribe(
      (response: any) => {
        console.log(" loadBanks", response);
        this.payments = response.results;
        this.isReady = true;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

}
