import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-chat-item",
  templateUrl: "./chat-item.component.html",
  styleUrls: ["./chat-item.component.scss"],
})
export class ChatItemComponent implements OnInit {
  @Input() userType;
  @Input() name;
  @Input() date;
  @Input() avatar;
  @Input() message;

  constructor() {}

  ngOnInit(): void {}
}
