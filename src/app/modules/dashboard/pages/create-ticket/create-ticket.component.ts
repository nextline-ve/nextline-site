import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.scss"],
})
export class CreateTicketComponent implements OnInit {
  public dateNow = "12/12/2020";
  public form: FormGroup;
  public ticketsCategories;
  public isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.form = new FormGroup({
      categories: new FormControl("", [
        Validators.minLength(1),
        Validators.required,
      ]),
      coment: new FormControl("", [
        Validators.minLength(1),
        Validators.required,
      ]),
    });
  }

  enviar() {
    this.router.navigate(["/panel/ticket-detail"]);
  }
}
