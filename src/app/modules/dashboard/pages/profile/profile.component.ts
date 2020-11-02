import {Component, OnInit} from '@angular/core';
import {RequestApiService} from 'src/app/services/request-api.service';
import {SessionsClientService} from 'src/app/services/sessions-client.service';
import {environment} from 'src/environments/environment.prod';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {UtilsService} from 'src/app/services/utils.service';
import {Observer} from '../../../../services/observer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isContentLoaded = false;
  public isLoading = false;
  public personalDataFormGroup: FormGroup;
  public domain = environment.DOMAIN;
  public cliente: any = {};
  public avatar = '../../../../../assets/images/imagotipo.png';
  public fileAvatar: File;


  constructor(
    private formBuilder: FormBuilder,
    private session: SessionsClientService,
    private http: RequestApiService,
    private utils: UtilsService,
    private event: Observer
  ) {
  }

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
      avatar: new FormControl(''),
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('',),
      newPassword: new FormControl('',),
    });
  }

  disableALlFields() {
    this.personalDataFormGroup.controls['name'].disable();
    this.personalDataFormGroup.controls['identification'].disable();
    this.personalDataFormGroup.controls['email'].disable();
    this.personalDataFormGroup.controls['phone'].disable();
    this.personalDataFormGroup.controls['password'].disable();
    this.personalDataFormGroup.controls['newPassword'].disable();
  }

  fillProfile() {
    this.personalDataFormGroup.controls.avatar.setValue(this.cliente.avatar);
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

  private setDataClient(response: any) {
    this.cliente = response;
    this.verifyAvatar(response.avatar);
    this.isContentLoaded = true;
    this.fillProfile();
  }
  async getProfile() {
    let urlEndPoint = 'admon/clientes/perfil';
    if (this.session.getCurrentSession().id_usuario == 0) {
      urlEndPoint = 'admon/futuros-clientes/perfil';
    }
    this.http.get(urlEndPoint, null, true).subscribe(
      (response: any) => this.setDataClient(response),
      (error) => { }
    );
    
  }

  async getContractStatus() {
    this.http.get('admon/contratos-status', null, true).subscribe(
      (response: any) => {
        this.cliente = response.results;
      },
      (error) => { }
    );
  }

  async getSolicitationStatus() {
    this.http.get('admon/solicitud-status', null, true).subscribe(
      (response: any) => {
        this.cliente = response;
      },
      (error) => { }
    );
  }

  verifyAvatar(img) {
    if (img != null) {
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

  onFileChanged(event) {
    this.fileAvatar = event.target.files[0];
    this.utils
      .imageFileToURI(event)
      .then((res: string) => {
        this.avatar = res;
      })
      .catch((e) => { });
  }

  save() {
    this.verifyChangePassword();

    if (this.personalDataFormGroup.invalid) {
      const invalid = [];
      const controls = this.personalDataFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }

      this.utils.showSnackBar(
        'Por favor, digite los campos corretamente...',
        5000
      );
      return;
    }
    this.isLoading = true;

    const myFormData: FormData = new FormData();

    if (this.fileAvatar) {
      myFormData.append('avatar', this.fileAvatar, this.fileAvatar.name);
    }
    myFormData.append('nombre_razsoc', this.personalDataFormGroup.get('name').value);
    myFormData.append('cedula_rif', this.personalDataFormGroup.get('identification').value);
    myFormData.append('correo', this.personalDataFormGroup.get('email').value);
    myFormData.append('celular', this.personalDataFormGroup.get('phone').value);

    this.http
      .put('admon/perfil', myFormData)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.updateLocalStorage(response);
          this.event.create(response.avatar);
        },
        (err) => {
          this.utils.showSnackBar(this.utils.formatErrors(err), 5000);
          this.isLoading = false;
        }
      );
  }

  async updateLocalStorage(newData) {
    const oldUser = JSON.parse(localStorage.getItem('nextline-currentClient'));
    await localStorage.setItem('nextline-currentClient', JSON.stringify({...oldUser, ...newData}));

  }

  verifyChangePassword() {
    const password = this.personalDataFormGroup.get('password').value;
    const newPassword = this.personalDataFormGroup.get('newPassword').value;

    if (password.length == 0 && newPassword.length == 0) {
      return;
    }

    if (
      password == '' &&
      password.length < 6 &&
      newPassword == '' &&
      newPassword.length < 6
    ) {
      this.utils.showSnackBar('Por favor, digite los campos de clave corretamente...', 5000);

      return;
    }

    this.http
      .post('admon/cambiar-clave/', {
        old_clave: password,
        clave: newPassword
      })
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.personalDataFormGroup.get('password').setValue('');
          this.personalDataFormGroup.get('newPassword').setValue('');
          this.utils.showSnackBar(response.mensaje, 5000);
        },
        (err) => {
          this.utils.showSnackBar(this.utils.formatErrors(err), 5000);
          this.isLoading = false;
        }
      );
  }

}
