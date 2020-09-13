import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { environment } from "src/environments/environment.prod";
import { RequestApiService } from "src/app/services/request-api.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  public domain = environment.DOMAIN;
  public cliente = {
    nombre_razsoc: "User Full Name Optional",
    avatar:
      "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg",
  };

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
  ) {}

  ngOnInit(): void {
    const session: any = this.session.getCurrentSession();

    if (session.es_cliente && this.session.isAuthenticated()) {
      this.getContractStatus();
    } else {
      this.getSolicitationStatus();
    }
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

  logout() {
    console.log("_ logout");
    this.session.logout();
  }
}
