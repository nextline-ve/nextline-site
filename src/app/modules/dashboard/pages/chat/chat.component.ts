import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { SessionsClientService } from 'src/app/services/sessions-client.service';
import { RequestApiService } from 'src/app/services/request-api.service';
import {
  AngularFireStorage,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public msg = '';
  public myFile: any;
  public regex: any;
  public fullMessage: any = {};
  public result: any;
  public chats = [];
  public message = '';
  public isLoading = true;
  public isFileLoading = false;
  public ticketId = null;
  public cliente: any = {};
  public ticket: any = {};
  public avatar =
    'https://pbs.twimg.com/profile_images/527229878211321857/Ken4pm5u_400x400.jpeg';
  public percentage: Observable<number>;
  public isFinished: boolean;
  private urlChat: string;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private zone: NgZone,
    private session: SessionsClientService,
    private http: RequestApiService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      this.ticketId = res.id;
      this.ticket = res;
      this.checkIfIsFinished(res.status);

      this.configUrlChat();
      this.loadChats();
      this.getProfile();
    });
  }

  private configUrlChat() {
    this.urlChat = 'chatsCollections/' + this.ticketId + ' - ' + environment.firebaseEnv;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    this.scrollToBottomContent();
  }

  checkIfIsFinished(status) {
    (status === 'S' || status === 'A' || status === 'F') ? this.isFinished = true : this.isFinished = false;
  }

  async getProfile() {
    this.http.get('admon/clientes/perfil', null, true).subscribe(
      (response: any) => {
        this.cliente = response;
        this.verifyAvatar(response.avatar);
        this.getClientId();
      },
      (error) => {
      }
    );
  }

  async getClientId() {
    const user: any = await localStorage.getItem('nextline-currentClient');
    this.cliente.id = JSON.parse(user).id_usuario;
    this.isLoading = false;
    console.log(this.cliente);
  }

  verifyAvatar(img) {
    if (img == null) {
      this.avatar =
        '../../../../../assets/images/default-avatar.jpeg';
    } else {
      this.avatar = img;
    }
  }

  loadChats() {
    this.db.database
      .ref(this.urlChat)
      .on('value', (snapshot) => {
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
        .ref(this.urlChat)
        .once('value')
        .then((snapshot) => {
          return Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
        });
    });

    setTimeout(() => {
      this.scrollToBottomContent();
    }, 100);
  }

  scrollToBottomContent() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  onFileChanged(event: any) {
    if (this.isFinished)
      return;

    this.isFileLoading = true;
    this.myFile = event.target.files[0];
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
            this.isFileLoading = false;
            this.saveFileToFirebase(url);
          });
        })
      )
      .subscribe();
  }

  getData() {
    const now = new Date();
    const day = now.getDate() <= 9 ? `0${now.getDate()}` : now.getDate();
    const month =
      now.getMonth() + 1 <= 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const hour = now.getHours() <= 9 ? `0${now.getHours()}` : now.getHours();
    const minutes =
      now.getMinutes() <= 9 ? `0${now.getMinutes()}` : now.getMinutes();
    const dataFormatada = `${day}/${month}/${now.getFullYear()} ${hour}:${minutes}`;

    return dataFormatada;
  }

  async saveFileToFirebase(url) {
    this.isFileLoading = false;

    this.fullMessage = {
      customId: this.cliente.id,
      imageUrl: url,
      date: this.getData(),
      type: 'img',
    };
    this.db.database
      .ref(this.urlChat)
      .push(this.fullMessage);
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
    if (this.isFinished) return;

    this.fullMessage = {
      customId: this.cliente.id,
      message: this.msg,
      date: this.getData(),
      type: 'text',
    };

    this.msg = '';

    this.db.database
      .ref(this.urlChat)
      .push(this.fullMessage);
  }

  getMessage(chat: any) {
    return (chat.type === 'img') ? chat.imageUrl : chat.message;
  }
}
