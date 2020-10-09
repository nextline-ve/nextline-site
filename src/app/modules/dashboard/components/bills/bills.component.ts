import { Component, Input, OnInit } from "@angular/core";
import mocks from "../../../../mocks";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
  public bills = [];
  @Input() mustShow = true;
  @Input() isSmall = false;

  constructor(
    private session: SessionsClientService,
    private http: RequestApiService
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills() {
    this.http.get("admon/factura/", null, true).subscribe(
      (response: any) => {
        // console.log("loadBills", response.results);
        this.bills = response.results;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }
}
