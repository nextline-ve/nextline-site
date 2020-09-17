import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  Inject,
} from "@angular/core";
import mocks from "../../../../mocks";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { RequestApiService } from "src/app/services/request-api.service";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { finalize, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;
  public msg = "";
  public myFile: any;
  public regex: any;
  public fullMessage: any = {};
  public result: any;
  public chats = [];
  public message = "";
  public isLoading = true;
  public isFileLoading = false;
  public ticketId = null;
  public cliente: any = {};
  public avatar =
    "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg";
  public percentage: Observable<number>;
  public task: AngularFireUploadTask;
  public snapshot: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private zone: NgZone,
    private session: SessionsClientService,
    private http: RequestApiService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      console.log(res.params);
      this.ticketId = res.params.id;
      // this.isLoading = false;
      this.loadChats();
      this.getProfile();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottomContent();
  }

  async getProfile() {
    this.http.get("admon/perfil", null, true).subscribe(
      (response: any) => {
        this.cliente = response;
        this.verifyAvatar(response.avatar);
        this.getClientId();
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async getClientId() {
    const user: any = await localStorage.getItem("nextline-currentClient");
    this.cliente.id = JSON.parse(user).id_usuario;
    this.isLoading = false;
    console.log(this.cliente);
  }

  verifyAvatar(img) {
    if (img == null) {
      this.avatar =
        "https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg";
    } else {
      this.avatar = img;
    }
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

  onFileChanged(event: any) {
    this.isFileLoading = true;
    this.myFile = event.target.files[0];
    // this.uploadFile();

    const file = event.target.files[0];
    const filePath = `images/${this.myFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.percentage = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url);
            this.isFileLoading = false;
            this.saveFileToFirebase(url);
          });
        })
      )
      .subscribe();
  }

  uploadFile() {
    // const fileRef = this.storage.ref(`images/${this.myFile.name}`);
    // this.percentage = task.percentageChanges();
    // this.storage
    //   .upload(`images/${this.myFile.name}`, this.myFile)
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe((url) => {
    //         console.log(url);
    //         this.isFileLoading = false;
    //         this.saveFileToFirebase(url);
    //       });
    //     })
    //   )
    //   .subscribe();
  }

  async saveFileToFirebase(url) {
    console.log("url", url);
    this.isFileLoading = false;

    const msg = "img";
    const now = new Date();
    this.fullMessage = {
      customId: this.cliente.id,
      message: url,
      dateMessage: this.getData(),
      typeMessage: "img",
    };
    this.db.database
      .ref("chatsCollections/" + this.ticketId)
      .push(this.fullMessage);
  }

  getData() {
    const now = new Date();
    const day = now.getDate() <= 9 ? `0${now.getDate()}` : now.getDate();
    const month =
      now.getMonth() + 1 <= 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const hour = now.getHours() <= 9 ? `0${now.getHours()}` : now.getHours();
    const minutes =
      now.getMinutes() <= 9 ? `0${now.getMinutes()}` : now.getMinutes();
    const dataFormatada = `${day}/${month}/${now.getFullYear()} - ${hour}:${minutes}`;

    return dataFormatada;
  }

  async validateSend() {
    let isMsgInvalid = false;

    this.regex = /[0-9]/;
    this.result = this.regex.test(this.msg);
    if (!this.result) {
      this.regex = /[a-z]/;
      this.result = this.regex.test(this.msg);
      if (!this.result) {
        this.regex = /[A-Z]/;
        this.result = this.regex.test(this.msg);
        if (!this.result) {
          isMsgInvalid = true;
        }
      }
    }

    if (isMsgInvalid) {
      return false;
    }

    this.send();
  }

  send() {
    this.fullMessage = {
      customId: this.cliente.id,
      message: this.msg,
      dateMessage: this.getData(),
      typeMessage: "text",
    };

    this.msg = "";

    this.db.database
      .ref("chatsCollections/" + this.ticketId)
      .push(this.fullMessage);
  }
}
