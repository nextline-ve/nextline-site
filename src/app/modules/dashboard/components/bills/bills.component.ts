import { Component, OnInit } from "@angular/core";
import mocks from "../../../../mocks";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
  public bills;

  constructor() {}

  ngOnInit(): void {
    this.bills = mocks.bills;
  }
}
