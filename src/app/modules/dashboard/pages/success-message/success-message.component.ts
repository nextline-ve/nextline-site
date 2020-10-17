import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-success-message",
  templateUrl: "./success-message.component.html",
  styleUrls: ["./success-message.component.scss"],
})
export class SuccessMessageComponent implements OnInit {
  public data: any = {};
  public isContentLoaded = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      this.data = res;
      this.isContentLoaded = true;
    });
  }
}
