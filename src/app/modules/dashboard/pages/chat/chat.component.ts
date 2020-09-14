import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from "@angular/core";
import mocks from "../../../../mocks";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  public chats = [];
  public message = '';
  public isLoading = true;
  public ticketId = null;
  public cliente = {
    id: 1,
    avatar:
      "https://s.abcnews.com/images/Entertainment/HT_TBarker1_MEM_151019_16x9_992.jpg",
  };

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      console.log(res.params);
      this.ticketId = res.params.id;
      this.isLoading = false;
      this.loadChats();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottomContent();
  }

  loadChats() {
    this.db.database
      .ref("chatsCollections/" + this.ticketId)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          this.updateChats();

          setTimeout(() => {
            this.scrollToBottomContent();
          }, 100);
        }
      });
  }

  async updateChats() {
    this.zone.run(async () => {
      this.chats = await this.db.database
        .ref("chatsCollections/" + this.ticketId)
        .once("value")
        .then((snapshot) => {
          return Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
        });

      // this.chats = this.chats.filter((element) => {
      //   return element.type !== "visualizacoes";
      // });
    });

    setTimeout(() => {
      this.scrollToBottomContent();
      console.log("chats", this.chats);
    }, 100);
  }

  scrollToBottomContent() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  verifyEnter(e){
    
  }
}
