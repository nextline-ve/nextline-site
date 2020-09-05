import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.scss"],
})
export class ToolBarComponent implements OnInit {
  public user = {
    name: "User Full Name Optional",
    pic:
      "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg",
  };
  constructor() {}

  ngOnInit(): void {}
}
