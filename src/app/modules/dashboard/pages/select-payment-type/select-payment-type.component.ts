import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

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
  public bill: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      // this.plan = res;
      // this.getContractStatus();
    });
  }

  selectPayment(item) {
    this.router.navigate(["/panel/bills/declare-payment"], {
      queryParams: { payment: item, bill: this.bill },
    });
  }
}
