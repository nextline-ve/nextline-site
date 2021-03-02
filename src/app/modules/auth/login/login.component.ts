import { Component, OnInit } from "@angular/core";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { UtilsService } from "src/app/services/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public loginInvalid: boolean;

  constructor(
    private http: RequestApiService,
    private session: SessionsClientService,
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.prepareForm();
  }

  prepareForm() {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      clave: new FormControl("", [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      this.utils.showSnackBar("Por favor, digite os campos corretamente...");
      console.log("Por favor, digite os campos corretamente...");
      return;
    }

    this.isLoading = true;
    this.http.post("config/auth/", this.form.getRawValue(), false).subscribe(
      (response: any) => {
        console.log("response", response);
        this.isLoading = false;
        this.session.registerSession(response);

        this.router.navigate(['/panel']);

      },
      (error) => {
        this.utils.showSnackBar("Email o clave invalidos", 10000);
        this.isLoading = false;
      }
    );
  }
}
