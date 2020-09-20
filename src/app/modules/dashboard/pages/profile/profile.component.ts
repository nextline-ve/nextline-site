import { Component, OnInit } from "@angular/core";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { environment } from "src/environments/environment.prod";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public isContentLoaded = false;
  public personalDataFormGroup: FormGroup;
  public domain = environment.DOMAIN;
  public cliente: any = {};
  public avatar =
    "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg";

  constructor(
    private formBuilder: FormBuilder,
    private session: SessionsClientService,
    private http: RequestApiService
  ) {}

  ngOnInit(): void {
    this.prepareForms();

    const session: any = this.session.getCurrentSession();

    if (session.es_cliente && this.session.isAuthenticated()) {
      this.getProfile();
      this.getContractStatus();
    } else {
      this.getSolicitationStatus();
    }
  }

  prepareForms() {
    this.personalDataFormGroup = this.formBuilder.group({
      avatar: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      identification: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  disableALlFields() {
    console.warn("disableALlFields");

    this.personalDataFormGroup.controls["name"].disable();
    this.personalDataFormGroup.controls["identification"].disable();
    this.personalDataFormGroup.controls["email"].disable();
    this.personalDataFormGroup.controls["phone"].disable();
    this.personalDataFormGroup.controls["password"].disable();
  }

  fillProfile() {
    console.warn("fillProfile");

    this.personalDataFormGroup.controls.name.setValue(
      this.cliente.nombre_razsoc
    );
    this.personalDataFormGroup.controls.identification.setValue(
      this.cliente.cedula_rif
    );
    this.personalDataFormGroup.controls.email.setValue(this.cliente.correo);
    this.personalDataFormGroup.controls.phone.setValue(this.cliente.celular);

    this.disableALlFields();
  }

  async getProfile() {
    this.http.get("admon/perfil", null, true).subscribe(
      (response: any) => {
        console.log("response, getProfile", response);
        this.cliente = response;
        this.verifyAvatar(response.avatar);
        this.isContentLoaded = true;
        this.fillProfile();
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        // console.log("response, getContractStatus", response);
        this.cliente = response.results;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async getSolicitationStatus() {
    this.http.get("admon/solicitud-status", null, true).subscribe(
      (response: any) => {
        // console.log("response, getSolicitationStatus", response);
        this.cliente = response;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  verifyAvatar(img) {
    if (img == null) {
      this.avatar =
        "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg";
    } else {
      this.avatar = img;
    }
  }

  toggleInput(inputName) {
    if (!this.personalDataFormGroup.controls[inputName].enabled) {
      this.personalDataFormGroup.controls[inputName].enable();
    } else {
      this.personalDataFormGroup.controls[inputName].disable();
    }
  }

  onFileChanged(e) {}

  save() {}
}
