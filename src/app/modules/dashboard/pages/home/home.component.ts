import { Component, OnInit } from "@angular/core";
import { SessionsClientService } from "src/app/services/sessions-client.service";
import { RequestApiService } from "src/app/services/request-api.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public isLoggedIn: Boolean = false;
  public realPicture: Boolean = false;
  public isUpdatingAvatar: Boolean = false;
  public solicitation: any = null;
  public contracts: any = [];
  public avatar: File;
  public imageSrc: string;

  constructor(
    private sessions: SessionsClientService,
    private http: RequestApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.sessions.isAuthenticated();
    let session: any = this.sessions.getCurrentSession();

    if (session.es_cliente) {
      this.getContractStatus();
    } else {
      this.getSolicitationStatus();
    }
  }

  async getContractStatus() {
    this.http.get("admon/contratos-status", null, true).subscribe(
      (response: any) => {
        console.log("response, getContractStatus", response);
        this.contracts = response.results;
        console.log(this.contracts);
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async getSolicitationStatus() {
    this.http.get("admon/solicitud-status", null, true).subscribe(
      (response: any) => {
        console.log("response, getSolicitationStatus", response);
        this.solicitation = response;
      },
      (error) => {
        console.log(error.error.message);
        console.log(error);
      }
    );
  }

  async imageSelected(event) {
    this.isUpdatingAvatar = true;

    this.avatar = event.target.files[0];
    console.log(event.target.files[0]);
    this.utils
      .imageFileToURI(event)
      .then((res: string) => {
        this.imageSrc = res;
        const myFormData: FormData = new FormData();
        myFormData.append("avatar", this.avatar, this.avatar.name);

        this.http.put("/api/v1/admon/perfil", myFormData).subscribe(
          (response: any) => {
            console.log("response", response);

            this.realPicture = true;
            this.imageSrc = response;
            this.isUpdatingAvatar = false;
          },
          (error) => {
            console.log(error.error.message);
            console.log(error.error.message);
            this.isUpdatingAvatar = false;
          }
        );
      })
      .catch((e) => {
        console.error(e);
        this.imageSrc = e;
        this.isUpdatingAvatar = false;
      });

    // this.avatar = files.item(0);
  }
}
