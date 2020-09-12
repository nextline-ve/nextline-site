import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { UtilsService } from "src/app/services/utils.service";
import * as moment from "moment";

@Component({
  selector: "app-create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.scss"],
})
export class CreateTicketComponent implements OnInit {
  public dateNow = moment(new Date()).format("DD/MM/YYYY");
  public form: FormGroup;
  public failures = [];
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private session: SessionsClientService,
    private http: RequestApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.prepareForm();
    this.loadFailures();
  }

  prepareForm() {
    this.form = new FormGroup({
      asunto: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      detalle: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  loadFailures() {
    this.http.get("support/tickets/categoria-fallas/", null, true).subscribe(
      (response: any) => {
        console.log("loadFailures: ", response);
        this.failures = response.results;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  send() {
    const ticket = {
      id: 1,
      tipo: "C, R, I ",
      fecha_creacion: "12/12/2020",
      status: " P, C, S, A, F",
      get_status_display: "disoplay status",
      detalle: "este es el detalle",
    };
    this.router.navigate(["/panel/ticket-detail"], { queryParams: ticket });
    return;

    if (!this.form.valid) {
      this.utils.showSnackBar("Todos los campos son requeridos.");
      return;
    }

    this.isLoading = true;

    this.http.post("support/tickets/", this.form.getRawValue(), true).subscribe(
      (response: any) => {
        console.log("response", response);
        this.isLoading = false;

        const ticket = {
          id: 2,
          tipo: "C, R, I ",
          fecha_creacion: "12/12/2020",
          status: " P, C, S, A, F",
          get_status_display: "disoplay status",
          detalle: "este es el detalle",
        };
        this.router.navigate(["/panel/ticket-detail"], { queryParams: ticket });
      },
      (error) => {
        console.log(error.error);
        console.log(error.error.message);
        this.utils.showSnackBar("Error al hacer la solicitud", 10000);
        this.isLoading = false;
      }
    );
  }
}
