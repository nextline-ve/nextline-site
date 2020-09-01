import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit {
  @Input() name: string;
  public serv_res = "serv_res.svg";
  public serv_emp = "serv_emp.svg";
  public serv_ded = "serv_ded.svg";
  public icon = "";

  constructor() {}

  ngOnInit(): void {
    if (this.name == "Residencial") {
      this.icon = this.serv_res;
    }
    if (this.name == "Empresarial") {
      this.icon = this.serv_emp;
    }
    if (this.name == "Dedicado") {
      this.icon = this.serv_ded;
    }
  }
}
