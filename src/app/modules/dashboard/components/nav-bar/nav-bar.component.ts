import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {SessionsClientService} from 'src/app/services/sessions-client.service';
import {environment} from 'src/environments/environment.prod';
import {RequestApiService} from 'src/app/services/request-api.service';

import {Observer} from '../../../../services/observer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public domain = environment.DOMAIN;
  public cliente: any;
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
    private http: RequestApiService,
    private event: Observer
  ) {
  }

  ngOnInit(): void {
    const session: any = this.session.getCurrentSession();
    this.getProfile();

    this.event.getObservable().subscribe( (avatar: any) => {
      this.avatar = avatar;
    });
  }

  async getProfile() {
    this.cliente = this.session.getCurrentSession();
    if (this.cliente.avatar != '') {
      this.avatar = this.cliente.avatar;
    }
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
