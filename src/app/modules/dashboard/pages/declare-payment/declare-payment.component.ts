import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UtilsService } from "src/app/services/utils.service";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectPaymentModalComponent } from "../../components/select-payment-modal/select-payment-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-declare-payment",
  templateUrl: "./declare-payment.component.html",
  styleUrls: ["./declare-payment.component.scss"],
})
export class DeclarePaymentComponent implements OnInit {
  public cliente: any = {};
  public metodo = null;
  public billId = null;
  public myForm: FormGroup;
  public payments = [
    { id: 1, name: "Zelle", icon: "zelle.png" },
    { id: 1, name: "Bank of america", icon: "bofa.png" },
    { id: 1, name: "Bank of america", icon: "bofa.png" },
    { id: 1, name: "Bank of america", icon: "bofa.png" },
    { id: 1, name: "Bank of america", icon: "bofa.png" },
  ];
  public selectedPayment: any = { ...this.payments[0], isValid: true };

  public isLoading = false;
  public fileComprobante: File;
  public comprobanteSrc: string;
  
  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
  };

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: RequestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionsClientService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.prepareForms();
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      this.metodo = res.method;
      this.billId = res.billId;
      this.getProfile();
    });
  }

  prepareForms() {
    this.myForm = this.formBuilder.group({
      referencia: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      fecha: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      monto: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      comprobante: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  async getProfile() {
    this.http.get("admon/perfil", null, true).subscribe(
      (response: any) => {
        // console.log("response, getProfile", response);
        this.cliente = response;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  showSelectPaymentModal() {
    const dialogForgotRef = this.dialog.open(SelectPaymentModalComponent, {
      width: "420px",
      data: {
        payments: this.payments,
      },
    });

    dialogForgotRef.afterClosed().subscribe((res) => {
      if (res) {
        this.selectedPayment = { ...res, isValid: true };
      }
    });
  }

  onFileChanged(event) {
    this.fileComprobante = event.target.files[0];
    console.log(event.target.files[0]);
    this.utils
      .imageFileToURI(event)
      .then((res: string) => {
        this.comprobanteSrc = res;
      })
      .catch((e) => {
        console.error(e);
        this.comprobanteSrc = e;
      });
  }

  deleteFile() {
    this.fileComprobante = null;
    this.comprobanteSrc = null;
  }

  enviar() {
    this.isLoading = true;

    if (this.myForm.invalid) {
      const invalid = [];
      const controls = this.myForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log("invalid", invalid);
      this.utils.showSnackBar(
        "Por favor, digite os campos corretamente...",
        5000
      );
      this.isLoading = false;

      return;
    }

    const myFormData: FormData = new FormData();

    // todo, isnert user id , inser bill id, inset method
    myFormData.append(
      "comprobante",
      this.fileComprobante,
      this.fileComprobante.name
    );
    myFormData.append("referencia", this.myForm.get("referencia").value);
    myFormData.append("fecha", this.myForm.get("fecha").value);
    myFormData.append("monto", this.myForm.get("monto").value);

    this.http.post("", myFormData, false).subscribe(
      async (res: any) => {
        this.isLoading = false;

        const obj = {
          title: "¡Gracias por su pago!",
          subTitle: "A la espera de confirmación",
          icon: "success-payed-bill.png",
        };

        this.router.navigate(["/panel/change-plan/success-message"], {
          queryParams: obj,
        });
      },
      (err) => {
        // const keyWithError = [];
        // for (const key in err.error) {
        //   if (Object.prototype.hasOwnProperty.call(err.error, key)) {
        //     if (err.error[key] != "") {
        //       keyWithError.push(`${err.error[key]} `);
        //     }
        //   }
        // }
        // const msg =
        //   keyWithError.length == 1
        //     ? `Error: ${keyWithError}`
        //     : `Errores: ${keyWithError.join(", ")}`;

        this.utils.showSnackBar(this.utils.formatErrors(err), 15000);
        this.isLoading = false;
      }
    );
  }
}
