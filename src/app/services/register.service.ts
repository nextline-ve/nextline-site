import { Injectable } from '@angular/core';
import { RequestApiService } from './request-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: RequestApiService) { }

  // async getServices(){
  //   this.http.post()
  // }

}
