import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-ticket-detail",
  templateUrl: "./ticket-detail.component.html",
  styleUrls: ["./ticket-detail.component.scss"],
})
export class TicketDetailComponent implements OnInit {
  public ticket = {
    detalle: "...",
    fecha_creacion: "...",
    get_status_display: "...",
    id: "2",
    status: "...",
    tipo: "...",
  };
  public dateFormated = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      this.ticket = res;
      this.formatDate();
    });
  }

  formatDate() {
    // ticket.fecha_creacion
    this.dateFormated = moment(this.ticket.fecha_creacion, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );
  }
}
