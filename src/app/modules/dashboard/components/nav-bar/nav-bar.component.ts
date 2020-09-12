import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { SessionsClientService } from 'src/app/services/sessions-client.service';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent {
  public user = {
    name: "User Full Name Optional",
    pic:
      "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg",
  };

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private session: SessionsClientService,) {}

  logout() {
    console.log("_ logout");
    this.session.logout();
  }
}
