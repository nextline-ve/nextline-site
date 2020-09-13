import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      this.ticket = res;
    });
  }
}
