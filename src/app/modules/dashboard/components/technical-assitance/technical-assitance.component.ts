import {Component, OnInit} from '@angular/core';
import {RequestApiService} from 'src/app/services/request-api.service';
import {SessionsClientService} from 'src/app/services/sessions-client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-technical-assitance',
  templateUrl: './technical-assitance.component.html',
  styleUrls: ['./technical-assitance.component.scss'],
})
export class TechnicalAssitanceComponent implements OnInit {
  public tickets = [];

  constructor(
    private router: Router,
    private http: RequestApiService
  ) {
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.http.get('support/tickets/', null, true).subscribe(
      (response: any) => {
        this.tickets = response.results;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  goToChact(ticket) {
    this.router.navigate(['/panel/chat'], {
      queryParams: {...ticket},
    });
  }
}
