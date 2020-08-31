import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(["auth"]);
      return false;
    }
    return true;
  }
}