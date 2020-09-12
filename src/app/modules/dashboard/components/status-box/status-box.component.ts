import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-status-box",
  templateUrl: "./status-box.component.html",
  styleUrls: ["./status-box.component.scss"],
})
export class StatusBoxComponent implements OnInit {
  @Input() status;
  constructor() {}

  ngOnInit(): void {}
}