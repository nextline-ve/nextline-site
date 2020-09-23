import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-select-payment-type",
  templateUrl: "./select-payment-type.component.html",
  styleUrls: ["./select-payment-type.component.scss"],
})
export class SelectPaymentTypeComponent implements OnInit {
  public payments = [
    { id: 1, name: "Zelle", icon: "zelle.png" },
    { id: 1, name: "Bank of america", icon: "bofa.png" },
  ];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      // this.plan = res;
      // this.getContractStatus();
    });
  }
}
