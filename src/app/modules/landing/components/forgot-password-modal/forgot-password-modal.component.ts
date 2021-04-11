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

@Component({
  selector: "app-forgot-password-modal",
  templateUrl: "./forgot-password-modal.component.html",
  styleUrls: ["./forgot-password-modal.component.scss"],
})
export class ForgotPasswordModalComponent implements OnInit {
  public email;
  public isLoading;
  public forgotFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    public dialog: MatDialog,
    private http: RequestApiService,
    private session: SessionsClientService,
    private utils: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.forgotFormGroup = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  send() {
    if (this.forgotFormGroup.invalid) {
      this.utils.showSnackBar(
        'Por favor, digite os campos corretamente...',
        5000
      );
      return;
    }
    this.isLoading = true;

    this.http
      .post(
        'config/restaurar-clave/',
        this.forgotFormGroup.getRawValue(),
        false
      )
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.close();
        },
        (err) => {
          this.utils.showSnackBar(this.utils.formatErrors(err), 5000);
          this.isLoading = false;
        }
      );
  }
}
