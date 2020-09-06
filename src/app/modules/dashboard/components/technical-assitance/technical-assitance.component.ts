import { Component, OnInit } from "@angular/core";
import mocks from "../../../../mocks";

@Component({
  selector: "app-technical-assitance",
  templateUrl: "./technical-assitance.component.html",
  styleUrls: ["./technical-assitance.component.scss"],
})
export class TechnicalAssitanceComponent implements OnInit {
  public tickets = [];
  constructor() {}

  ngOnInit(): void {
    this.tickets = mocks.tickets;
  }
}
