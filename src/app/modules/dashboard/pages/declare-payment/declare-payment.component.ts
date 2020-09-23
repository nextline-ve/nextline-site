import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UtilsService } from "src/app/services/utils.service";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";

@Component({
  selector: "app-declare-payment",
  templateUrl: "./declare-payment.component.html",
  styleUrls: ["./declare-payment.component.scss"],
})
export class DeclarePaymentComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private session: SessionsClientService,
    private http: RequestApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {}

  onFileChanged(e) {}
}
