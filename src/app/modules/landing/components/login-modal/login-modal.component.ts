import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { UtilsService } from "../../../../services/utils.service";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent implements OnInit {
  public email;
  public isLoading;
  public loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private http: RequestApiService,
    private session: SessionsClientService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {}

  prepareForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  login() {
    console.log("login");
    if (this.loginFormGroup.invalid) {
      console.log("Por favor, digite os campos corretamente...");
      this.utils.showSnackBar(
        "Por favor, digite os campos corretamente...",
        5000
      );
      return;
    }
    this.isLoading = true;

    this.http
      .post("config/auth/", this.loginFormGroup.getRawValue(), false)
      .subscribe(
        (response: any) => {
          console.log("response", response);
          this.isLoading = false;
          this.session.registerSession(response);
          console.log("Bem-vindo");
          window.location.replace("/panel");
        },
        (error) => {
          console.log(error.error.message);
          console.log(error.error.message);
          this.utils.showSnackBar(error.error.message, 5000);
          this.isLoading = false;
        }
      );
  }
}
