import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-plan-date-box",
  templateUrl: "./plan-date-box.component.html",
  styleUrls: ["./plan-date-box.component.scss"],
})
export class PlanDateBoxComponent implements OnInit {
  @Input() date = null;
  public dateFormated;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.calculateDate();
    }, 1000);
  }

  ngAfterContentInit() {}

  calculateDate() {
    const now = moment();
    const year = now.get("year");
    const month = now.get("month");
    const day = now.get("day");
    const currentMonth = this.date >= day ? 2 : 1;

    const planDate = `${this.date}-${month + currentMonth}-${year}`;
    console.log(planDate);
    this.dateFormated = moment(planDate, "DD-MM-YYYY").format("DD/MM/YYYY");
  }
}
