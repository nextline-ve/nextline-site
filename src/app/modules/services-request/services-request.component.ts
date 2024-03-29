import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { GeoUtilsService } from "../../services/geo-utils.service";
import { RequestApiService } from "../../services/request-api.service";
import { SessionsClientService } from "../../services/sessions-client.service";
import { UtilsService } from "../../services/utils.service";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-services-request",
  templateUrl: "./services-request.component.html",
  styleUrls: ["./services-request.component.scss"],
})
export class ServicesRequestComponent implements OnInit {
  @ViewChild("stepper", {static: true}) stepper: MatStepper;
  public serviceFormGroup: FormGroup;
  public selectedService: any;
  public selectedPlan = null;
  public plansFormGroup: FormGroup;
  public personalDataFormGroup: FormGroup;
  public isEditable = true;
  public isLoadingLocation = false;
  public doesLocationDidLoad = false;
  public doesItHaveLocation = false;
  public didAskedLocationFailed = false;
  public doesItHaveAddress = false;
  public isConfirmedAddress = false;
  public addressView = "confirm";
  public myAddress = null;
  public reference = null;
  public currentLocation = null;
  public isLoading = false;
  public services = [];
  public plans = [];
  public avatar: File;
  public imageSrc: string;

  constructor(
    private formBuilder: FormBuilder,
    private geoUtils: GeoUtilsService,
    private http: RequestApiService,
    private router: Router,
    private session: SessionsClientService,
    private utils: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.prepareForms();
    this.getServices();
  }

  prepareForms() {
    this.serviceFormGroup = this.formBuilder.group({
      service: [""],
    });
    this.plansFormGroup = this.formBuilder.group({
      plan: [""],
    });
    this.personalDataFormGroup = this.formBuilder.group({
      avatar: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      identification: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      password: new FormControl("", [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  async getServices() {
    this.http.get("config/tipo-servicios/", null, false).subscribe(
      (res: any) => {
        this.services = res.results;
      },
      (err) => {
        console.error(err);
        this.utils.showSnackBar(
          "Error al conectarse a nuestros servidores",
          3000
        );
      }
    );
  }

  async getPlans() {
    this.http.get("config/planes/", null, false).subscribe(
      (res: any) => {
        this.plans = res.results;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async setService(item) {
    this.selectedService = item;

    this.http
      .get("config/planes/", {tipo_servicio__id: item}, false)
      .subscribe((response: any) => {
        this.plans = response.results;
      });
  }

  async setPlan(item) {
    this.selectedPlan = item;
  }

  validateSelectedService() {
    if (this.selectedService == null) {
      this.utils.showSnackBar("Por favor seleccione el tipo de servicio.");
      return;
    }
    this.stepper.next();
  }

  validateSelectedPlan() {
    if (this.selectedPlan == null) {
      this.utils.showSnackBar("Por favor seleccione un plan.");
      return;
    }
    this.stepper.next();
  }

  onFileChanged(event) {
    this.avatar = event.target.files[0];
    this.utils
      .imageFileToURI(event)
      .then((res: string) => {
        this.imageSrc = res;
      })
      .catch((e) => {
        console.error(e);
        this.imageSrc = e;
      });
  }

  onStepChange(event: any): void {
    if (event.selectedIndex == 3) {
      this.isLoadingLocation = true;
      this.geoUtils
        .askLocation()
        .then((res: any) => {
          this.doesItHaveLocation = true;
          this.currentLocation = res;
          this.getAddress(
            {
              latitude: res.latitude,
              longitude: res.longitude
            });
          this.didAskedLocationFailed = false;
          this.isLoadingLocation = false;
        })
        .catch((e) => {
          this.doesItHaveLocation = false;
          this.didAskedLocationFailed = true;
          this.isLoadingLocation = false;
          this.utils.showSnackBar("No se pudo obtener tu localizacion actual.");
          console.error(e);
        });
    }
  }

  async getAddress(coords: any) {
    this.geoUtils
      .getAddress(coords)
      .then((res: any) => {
        this.myAddress = `Parroquia: - Estado ${res.address_components[4].long_name} - Municipio: ${res.address_components[3].long_name}, Calle: ${res.address_components[1].long_name} ${res.address_components[0].long_name}. `;
        this.doesItHaveAddress = true;
        this.isLoadingLocation = false;
      })
      .catch((e) => {
        console.error(e);
        this.didAskedLocationFailed = true;
        this.isLoadingLocation = false;
        this.utils.showSnackBar(e);
      });
  }

  async setAddressView(type) {
    if (type == "map") {
      if (this.currentLocation == null) {
        this.currentLocation = {
          latitude: 10.502456738546742,
          longitude: -66.85264314414663,
        };
      } else {

      }
    }
    this.addressView = type;
  }

  setLocation(e) {
    this.currentLocation = e;
    this.getAddress(e);
    this.setAddressView("address");
  }

  validatePersonalForm() {
    if (!this.personalDataFormGroup.valid) {
      const invalid = [];
      const controls = this.personalDataFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      this.utils.showSnackBar("Todos los campos son requeridos.");

      return;
    }
  }

  async requestService() {
    this.isLoading = true;

    const myFormData: FormData = new FormData();
    myFormData.append(
      "nombre_razsoc",
      this.personalDataFormGroup.get("name").value
    );
    myFormData.append(
      "cedula_rif",
      this.personalDataFormGroup.get("identification").value
    );
    myFormData.append("correo", this.personalDataFormGroup.get("email").value);
    myFormData.append("celular", this.personalDataFormGroup.get("phone").value);
    myFormData.append("plan", this.selectedPlan);
    myFormData.append(
      "direccion",
      this.myAddress + `Punto de Referencia: ${this.reference}`
    );
    myFormData.append(
      "clave",
      this.personalDataFormGroup.get("password").value
    );
    myFormData.append("avatar", this.avatar, this.avatar.name);
    myFormData.append("latitud", this.currentLocation.latitude);
    myFormData.append("longitud", this.currentLocation.longitude);

    this.http.post("admon/service-request", myFormData, false).subscribe(
      async (res: any) => {
        this.utils.showSnackBar(
          JSON.stringify("Registrado con exito, por favor inicie sesion"),
          15000
        );
        await localStorage.setItem("nextline-actions-open-login", "open");
        this.isLoading = false;

        this.router.navigate([""]);
      },
      (err) => {
        this.utils.showSnackBar(this.utils.formatErrors(err), 15000);
        this.isLoading = false;
      }
    );
  }
}
