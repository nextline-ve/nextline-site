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
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
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
  ) {}

  ngOnInit(): void {
    console.error("service-request");

    this.prepareForms();
    this.getServices();
    this.getPlans();
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
      phone: new FormControl("", Validators.required),
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
          "Error al conectarse a nuestros ervidores",
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
      .get("config/planes/", { tipo_servicio__id: item }, false)
      .subscribe((response: any) => {
        console.log(response.results);

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
    console.log(event.target.files[0]);
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
        .then((res) => {
          console.log("_ promise res", res);
          this.doesItHaveLocation = true;
          this.currentLocation = res;
          this.getAddress(res);
          this.didAskedLocationFailed = false;
          console.log(res);
        })
        .catch((e) => {
          this.doesItHaveLocation = false;
          this.didAskedLocationFailed = true;
          this.utils.showSnackBar("No se pudo obtener tu localizacion actual.");
          console.error(e);
        });
    }
  }

  async getAddress(coords: any) {
    this.geoUtils
      .getAddress(coords)
      .then((res: any) => {
        console.log("getAddress proper address", res.formatted_address);
        this.myAddress = res.formatted_address;
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
    console.log("setAddressView");

    if (type == "map") {
      console.log("setAddressView map");
      if (this.currentLocation == null) {
        this.currentLocation = {
          latitude: 10.502456738546742,
          longitude: -66.85264314414663,
        };
        console.log("setAddressView null current", this.currentLocation);
      } else {
        console.log("setAddressView not null current", this.currentLocation);
      }
    }
    this.addressView = type;
  }

  setLocation(e) {
    console.log("set", e);
    this.currentLocation = e;
    this.getAddress(e);
    this.setAddressView("address");
  }

  validatePersonalForm() {
    if (!this.personalDataFormGroup.valid) {
      return;
    }
  }

  async requestService() {
    this.isLoading = true;

    console.warn(this.personalDataFormGroup.get("identification").value);
    console.log(this.selectedPlan);

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
    myFormData.append("direccion", this.myAddress);
    myFormData.append(
      "clave",
      this.personalDataFormGroup.get("password").value
    );
    myFormData.append("avatar", this.avatar, this.avatar.name);
    myFormData.append("latitud", this.currentLocation.latitude);
    myFormData.append("longitud", this.currentLocation.longitude);

    this.http.post("admon/service-request", myFormData, false).subscribe(
      (res: any) => {
        this.plans = res.results;
        this.isLoading = false;
        this.utils.showSnackBar(
          JSON.stringify("Registrado con exito, por favor inicie sesion"),
          15000
        );

        this.router.navigate(["auth"]);
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
