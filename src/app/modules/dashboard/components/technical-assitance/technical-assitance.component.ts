import { Component, OnInit } from "@angular/core";
import mocks from "../../../../mocks";
import { RequestApiService } from "src/app/services/request-api.service";
import { SessionsClientService } from "src/app/services/sessions-client.service";

@Component({
  selector: "app-technical-assitance",
  templateUrl: "./technical-assitance.component.html",
  styleUrls: ["./technical-assitance.component.scss"],
})
export class TechnicalAssitanceComponent implements OnInit {
  public tickets = [];

  constructor(
    private session: SessionsClientService,
    private http: RequestApiService
  ) {}

  ngOnInit(): void {
    // this.tickets = mocks.tickets;
    this.loadTickets();
  }

  loadTickets() {
    this.http.get("support/tickets/", null, true).subscribe(
      (response: any) => {
        console.log("response, loadTickets", response);
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }
}
