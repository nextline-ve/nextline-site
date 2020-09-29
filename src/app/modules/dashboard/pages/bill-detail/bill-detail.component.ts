import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.scss"],
})
export class BillDetailComponent implements OnInit {
  public billId = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      console.log(res.params);
      this.billId = res.params.id;
      this.loadBill();
    });
  }

  loadBill() {}

  downloadBill() {}

  payBill(method) {
    this.router.navigate(["/panel/bills/declare-payment"], {
      queryParams: { method, bill: this.billId },
    });
  }
}
