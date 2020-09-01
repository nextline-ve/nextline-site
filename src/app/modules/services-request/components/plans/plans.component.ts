import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-plans",
  templateUrl: "./plans.component.html",
  styleUrls: ["./plans.component.scss"],
})
export class PlansComponent implements OnInit {
  @Input() id: any;
  @Input() name: any;
  @Input() bolivarPrice: any;
  @Input() dolarPrice: any;
  @Input() downSpeed: any;
  @Input() upSpeed: any;
  @Input() selectedPlanId: any;
  constructor() {}

  ngOnInit(): void {}
}
