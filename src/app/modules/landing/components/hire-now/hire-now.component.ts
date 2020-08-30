import { Component, OnInit } from '@angular/core';
import {RequestApiService} from '../../../../services/request-api.service';

@Component({
  selector: 'app-hire-now',
  templateUrl: './hire-now.component.html',
  styleUrls: ['./hire-now.component.scss']
})
export class HireNowComponent implements OnInit {
  services =  [];
  constructor(
    private http: RequestApiService
  ) { }

  ngOnInit(): void {
    
    this.http.get('config/tipo-servicios/', '', false).subscribe( (response: any) => {
      console.log(response);
      this.services = response.results;
    });
  }

}
