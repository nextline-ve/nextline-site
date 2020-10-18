import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {SessionsClientService} from 'src/app/services/sessions-client.service';
import {environment} from 'src/environments/environment.prod';
import {RequestApiService} from 'src/app/services/request-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public domain = environment.DOMAIN;
  public cliente = {
    nombre_razsoc: 'User Full Name Optional',
  };
  public avatar =
    '../../../../../assets/images/default-avatar.jpeg';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private session: SessionsClientService,
    private http: RequestApiService
  ) {
  }

  ngOnInit(): void {
    const session: any = this.session.getCurrentSession();

    if (session.es_cliente && this.session.isAuthenticated()) {
      this.getProfile();
    } else {
      this.getSolicitationStatus();
    }
  }

  async getProfile() {
    this.http.get('admon/perfil', null, true).subscribe(
      (response: any) => {
        this.cliente = response;
        this.verifyAvatar(response.avatar);
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
    if (img == null) {
      this.avatar =
        '../../../../../assets/images/default-avatar.jpeg';
    } else {
      this.avatar = img;
    }
  }

  logout() {
    this.session.logout();
  }
}
