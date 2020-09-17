import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-chat-item",
  templateUrl: "./chat-item.component.html",
  styleUrls: ["./chat-item.component.scss"],
})
export class ChatItemComponent implements OnInit {
  @Input() userType;
  @Input() type;
  @Input() name;
  @Input() date;
  @Input() avatar;
  @Input() message;
  public defaultAvatar = "../../../../../assets/images/imagotipo.png";

  constructor() {}

  ngOnInit(): void {
    // console.log(this.avatar);
    // console.log(this.userType);
  }
}
