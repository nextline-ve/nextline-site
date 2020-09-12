import { Component, OnInit } from "@angular/core";
import mocks from "../../../../mocks";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  public chats = mocks.chats;
  public cliente = {
    id: 1,
    avatar:
      "https://s.abcnews.com/images/Entertainment/HT_TBarker1_MEM_151019_16x9_992.jpg",
  };

  constructor() {}

  ngOnInit(): void {}
}
