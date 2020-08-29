import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GeoUtilsService} from '../../services/geo-utils.service';
import {RequestApiService} from '../../services/request-api.service';
import {SessionsClientService} from '../../services/sessions-client.service';
import {UtilsService} from '../../services/utils.service';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-services-request',
  templateUrl: './services-request.component.html',
  styleUrls: ['./services-request.component.scss']
})
export class ServicesRequestComponent implements OnInit {
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  serviceFormGroup: FormGroup;
  selectedService: any;
  selectedPlan = null;
  plansFormGroup: FormGroup;
  personalDataFormGroup: FormGroup;
  isEditable = true;
  isGettingLocation = false;
  doesLocationDidLoad = false;
  doesItHaveLocation = false;
  doesItHaveAddress = false;
  isConfirmedAddress = false;
  isLoading = false;
  currentLocation = null;
  myAddress = null;
  services = [];
  plans = [];
  preparedPlans = [];
  avatar: File;
  imageSrc: string;

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
    this.getPlans();
  }

  prepareForms() {
    this.serviceFormGroup = this.formBuilder.group({
      service: [''],
    });
    this.plansFormGroup = this.formBuilder.group({
      plan: [''],
    });
    this.personalDataFormGroup = this.formBuilder.group({
      avatar: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    });
  }

  async getServices() {
    this.http.get('config/tipo-servicios/', null, false).subscribe((res: any) => {
      console.log('servicios', res);
      this.services = res.results;
    }, err => {
      console.error(err);
      this.utils.showSnackBar('Error al conectarse a nuestros ervidores', 3000);
    });
  }

  async getPlans() {
    this.http.get('config/planes/', null, false).subscribe((res: any) => {
      this.plans = res.results;
    }, err => {
      console.error(err);
    });
  }

  async setService(item) {
    this.selectedService = item;

    this.http.get('config/planes/', {tipo_servicio__id: item}, false).subscribe( (response: any) => {
      this.plans = response.results;
    });
  }

  async setPlan(item) {
    this.selectedPlan = item;
  }

  async getAddress(coords: any) {
    this.geoUtils.getAddress(coords).then((res: any) => {
      console.log('results', res);
      console.log('proper address', res.formatted_address);
      this.myAddress = res.formatted_address;
      this.doesItHaveAddress = true;
    }).catch(e => {
      this.utils.showSnackBar(e);
    });
  }

  public onStepChange(event: any): void {
    console.log(this.selectedService);
    console.log(this.selectedPlan);
    if (event.selectedIndex == 3) {
      this.geoUtils.askLocation().then(res => {
        console.log('_ promise res', res);
        this.doesItHaveLocation = true;
        this.currentLocation = res;
        this.getAddress(res);
        console.log(res);
      }).catch(e => {
        this.doesItHaveLocation = false;
        this.utils.showSnackBar('No se pudo obtener tu localizacion actual.');
        console.error(e);
      });
    }
  }

  async confirmAddress() {
    console.log('confirmAddress this.myAddress', this.myAddress);
    /*const dialogRef = this.dialog.open(ConfirmAddressComponent, {
      width: '300px',
      data: {
        address: this.myAddress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.myAddress = result.address;
      if (!result.res) {
        this.pickAddress();
      }
    });*/
  }

  async pickAddress() {
    console.log('pickAddress this.currentLocation', this.currentLocation);
    const coords = {
      latitude: 10.502456738546742,
      longitude: -66.85264314414663
    };
    if (this.currentLocation != null) {
      coords.latitude = this.currentLocation.latitude,
        coords.longitude = this.currentLocation.longitude;
    }
    /*const dialogRef = this.dialog.open(ModalPickAddressComponent, {
      width: '600px',
      data: {
        address: this.myAddress,
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.res) {
        this.currentLocation = result.currentLocation;
        console.log('__ this.currentLocation.latitude', this.currentLocation.latitude);
        console.log('__ this.currentLocation', this.currentLocation);

        this.getAddress({
          latitude: this.currentLocation.latitude,
          longitude: this.currentLocation.longitude
        });
      }
    });*/
  }

  onFileChanged(event) {
    this.avatar = event.target.files[0];
    console.log(event.target.files[0]);
    this.utils.imageFileToURI(event).then((res: string) => {
      this.imageSrc = res;
    }).catch(e => {
      console.error(e);
      this.imageSrc = e;
    });
  }

  validatePersonalForm() {
    if (!this.personalDataFormGroup.valid) {
      return;
    }
  }

  async requestService() {
    this.isLoading = true;

    console.warn(this.personalDataFormGroup.get('identification').value);
    console.log(this.selectedPlan);

    const myFormData: FormData = new FormData();
    myFormData.append('nombre_razsoc', this.personalDataFormGroup.get('name').value);
    myFormData.append('cedula_rif', this.personalDataFormGroup.get('identification').value);
    myFormData.append('correo', this.personalDataFormGroup.get('email').value);
    myFormData.append('celular', this.personalDataFormGroup.get('phone').value);
    myFormData.append('plan', this.selectedPlan);
    myFormData.append('direccion', this.myAddress);
    myFormData.append('clave', this.personalDataFormGroup.get('password').value);
    myFormData.append('avatar', this.avatar, this.avatar.name);
    myFormData.append('latitud', this.currentLocation.latitude);
    myFormData.append('longitud', this.currentLocation.longitude);

    this.http.post('admon/service-request', myFormData, false).subscribe((res: any) => {
      this.plans = res.results;
      this.isLoading = false;
      this.router.navigate(['login']);

    }, err => {
      const keyWithError = [];
      for (const key in err.error) {
        if (Object.prototype.hasOwnProperty.call(err.error, key)) {
          if (err.error[key] != '') {
            keyWithError.push(`${err.error[key]} `);
          }
        }
      }
      const msg = (keyWithError.length == 1)
        ? `Error: ${keyWithError}`
        : `Errores: ${keyWithError.join(', ')}`;

      this.utils.showSnackBar(JSON.stringify(msg), 15000);
      this.isLoading = false;
    });
  }

  validateSelectedService() {
    if (this.selectedService == null) {
      this.utils.showSnackBar('Por favor seleccione el tipo de servicio.');
      return;
    }
    this.stepper.next();
  }

  validateSelectedPlan() {
    if (this.selectedPlan == null) {
      this.utils.showSnackBar('Por favor seleccione un plan.');
      return;
    }
    this.stepper.next();
  }

}
