import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SessionsClientService } from './sessions-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class RequestApiService {
  private ambiente: string;

  constructor(private http: HttpClient, private session: SessionsClientService) {
    this.ambiente = environment.URL_API;
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization:  'Token ' + this.session.getCurrentSession().token,
    });
  }

  public getBody(form: any) {
    return new Promise(resolve => {
      const body: FormData = new FormData();
      // tslint:disable-next-line:forin
      for (const key in form) {
        body.append(key, form[key]);
      }
      console.log(body);
      resolve(body);
    });
  }

  /**
   * POST
   * url recebe função a ser chamada na API
   * dados recebe uma string
   */
  public post(url: string, form: any, isPrivate = true): Observable<any> {
    let headerRequest: any;
    if (isPrivate) {
      headerRequest = {
        headers: this.getHeader(),
      };
    } else {
      headerRequest = { };
    }
    console.log(headerRequest);
    return this.http.post(
      this.ambiente + url,
      form,
      headerRequest
    );

  }

  public put(url: string, dados:any) {
    let headerRequest = {
      headers: this.getHeader(),
    };

    return this.http.put(
      this.ambiente + url,
      dados,
      headerRequest
    );
  }

  /**
   * GET
   * url recebe função a ser chamada na API
   * filtro valor que será filtrado na API
   */
  public get(url: string, dados = {}, prv = true) {
    if (prv) {
      return this.http.get(
        this.ambiente + url,
        {
          params: dados,
          headers: this.getHeader()
        }
      );
    } else {
      return this.http.get(
        this.ambiente + url,
        {
          params: dados
        }
      );
    }

  }

  /**
   * DELETE
   * url recebe função a ser chamada na API
   * filtro valor que será filtrado na API
   */
  public delete(url: string, dados = {}) {
    return this.http.delete(
      this.ambiente + url ,
      {
        params: dados,
      }
    );
  }

  /**
   * GET com promise
   * url recebe função a ser chamada na API
   * filtro valor que será filtrado na API
   */
  public async getPromise(url: string, dados = {}) {
    return this.http
      .get(this.ambiente + url, {
        params: dados
      })
      .toPromise()
      .then(resposta => {
        return resposta;
      })
      .catch(erro => {
        console.log(erro);
      });
  }

}
