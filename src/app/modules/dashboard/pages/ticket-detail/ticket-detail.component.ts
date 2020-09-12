import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ticket-detail",
  templateUrl: "./ticket-detail.component.html",
  styleUrls: ["./ticket-detail.component.scss"],
})
export class TicketDetailComponent implements OnInit {
  public ticket = {
    detalle: "este es el detalle",
    fecha_creacion: "12/12/2020",
    get_status_display: "disoplay status",
    id: "2",
    status: " P, C, S, A, F",
    tipo: "C, R, I ",
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      console.log(res);
    });
  }
}
