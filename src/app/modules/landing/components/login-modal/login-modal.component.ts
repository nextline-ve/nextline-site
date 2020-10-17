import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { UtilsService } from "../../../../services/utils.service";
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

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
    public dialog: MatDialog,
    private http: RequestApiService,
    private session: SessionsClientService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      clave: new FormControl("", [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  showForgotPasswordModal() {
    this.dialogRef.close();

    const dialogForgotRef = this.dialog.open(ForgotPasswordModalComponent, {
      width: "420px",
    });
  }

  login() {
    if (this.loginFormGroup.invalid) {
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
          this.isLoading = false;
          this.session.registerSession(response);
          localStorage.removeItem("nextline-actions");
          window.location.replace("/panel");
        },
        (err) => {
          this.utils.showSnackBar(this.utils.formatErrors(err), 5000);
          this.isLoading = false;
        }
      );
  }
}
