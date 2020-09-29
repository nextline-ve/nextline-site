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

@Component({
  selector: "app-declare-payment",
  templateUrl: "./declare-payment.component.html",
  styleUrls: ["./declare-payment.component.scss"],
})
export class DeclarePaymentComponent implements OnInit {
  public cliente: any = {};
  public myForm: FormGroup;
  public payments = [
    { id: 1, name: "Zelle", icon: "zelle.png" },
    { id: 1, name: "Bank of america", icon: "bofa.png" },
  ];
  public isLoading = false;
  public fileComprobante: File;
  public comprobanteSrc: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private session: SessionsClientService,
    private router: Router,
    private http: RequestApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.prepareForms();
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
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

  enviar() {
    const obj = {
      title: "¡Gracias por su pago!",
      subTitle: "A la espera de confirmación",
      icon: "success-payed-bill.png",
    };

    this.router.navigate(["/panel/change-plan/success-message"], {
      queryParams: obj,
    });
    // to delete
    this.isLoading = true;

    const myFormData: FormData = new FormData();

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
