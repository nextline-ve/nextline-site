import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestApiService } from 'src/app/services/request-api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-payment-commitment-modal',
  templateUrl: './payment-commitment-modal.component.html',
  styleUrls: ['./payment-commitment-modal.component.scss']
})
export class PaymentCommitmentModalComponent implements OnInit {
  public isReady = false;
  public enterprise = null;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: RequestApiService,
    private utils: UtilsService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentCommitmentModalComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.payment) {
      console.log('ok...', this.data);
    }
  }

  close() {
    this.dialogRef.close();
  }

  async loadEnterprise() {
    this.http.get("config/empresa/", {tipo_moneda: this.data.payment}, true).subscribe(
      (response: any) => {
        console.log(" loadBanks", response);
        this.isReady = true;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

}
