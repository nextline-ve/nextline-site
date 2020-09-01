import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit {
  @Input() id: any;
  @Input() name: string;
  @Input() selectedServiceId: any;
  public serv_res = "serv_res";
  public serv_emp = "serv_emp";
  public serv_ded = "serv_ded";
  public icon = "";

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    switch (this.name) {
      case "Residencial":
        this.icon = this.serv_res;
        break;
      case "Empresarial":
        this.icon = this.serv_emp;
        break;
      case "Dedicado":
        this.icon = this.serv_ded;
        break;
      default:
        break;
    }
  }

}
