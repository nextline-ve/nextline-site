import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public isLoading = false;
  public enterprise = null;
  public billId = null;
  public daysForCommitment = null;
  public myForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: RequestApiService,
    private utils: UtilsService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentCommitmentModalComponent>
  ) { }

  ngOnInit(): void {
    this.prepareForms();
    if (this.data) {
      console.log('ok...', this.data);
      this.billId = this.data.billId
    }
    this.loadEnterprise()
  }

  prepareForms() {
    this.myForm = this.formBuilder.group({
      fecha: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]), 
    });
  }

  close() {
    this.dialogRef.close();
  }

  async loadEnterprise() {
    this.http.get("config/empresa/", null, true).subscribe(
      (response: any) => {
        console.log(" loadEnterprise", response);
        this.daysForCommitment = response.compromiso_pago
        this.isReady = true;
        this.isLoading = false;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async enviar(){
    this.isLoading = true;

    const validDate = this.utils.validateDaysForCommitment(this.myForm.get("fecha").value, this.daysForCommitment);
    console.log("validDate", validDate);
    
    if (!validDate.isBefore) {

      this.utils.showSnackBar(
        `Por favor, digite uma data menor a ${validDate.maxDate}...`,
        5000
      );
      this.isLoading = false;
      return;
    }

    if (this.myForm.invalid) {
      const invalid = [];
      const controls = this.myForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      this.utils.showSnackBar(
        "Por favor, digite os campos corretamente...",
        5000
      );
      this.isLoading = false;

      return;
    }

    const myFormData: FormData = new FormData();
 
    myFormData.append("fecha_compromiso", this.myForm.get("fecha").value);
    
    this.http.post(`admon/factura/${this.billId}/compromiso-pago/`, myFormData, true).subscribe(
      async (res: any) => {
        this.isLoading = false;

        this.utils.showSnackBar("¡Gracias por su compromiso!", 15000);
      },
      (err) => { 
        this.utils.showSnackBar(this.utils.formatErrors(err), 15000);
        this.isLoading = false;
      }
    );
  }
  // fecha_compromiso
  // 

}
