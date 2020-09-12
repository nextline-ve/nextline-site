import { Component, OnInit } from "@angular/core";
import mocks from "../../../../mocks";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  public chats = mocks.chats;

  constructor() {}

  ngOnInit(): void {}
}
