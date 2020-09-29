import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-select-payment-modal",
  templateUrl: "./select-payment-modal.component.html",
  styleUrls: ["./select-payment-modal.component.scss"],
})
export class SelectPaymentModalComponent implements OnInit {
  public isReady = false;
  public payments = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectPaymentModalComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.payments) {
      this.payments = this.data.payments;
      if (this.payments.length > 0) {
        this.isReady = true;
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  selectPayment(payment) {
    this.dialogRef.close({ ...payment });
  }
}
