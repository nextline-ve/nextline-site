import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-nav-bar-link",
  templateUrl: "./nav-bar-link.component.html",
  styleUrls: ["./nav-bar-link.component.scss"],
})
export class NavBarLinkComponent implements OnInit {
  @Input() name;
  @Input() iconPosition = "left";
  constructor() {}

  ngOnInit(): void {}
}
