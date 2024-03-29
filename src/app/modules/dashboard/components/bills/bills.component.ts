import {Component, Input, OnInit} from '@angular/core';
import mocks from '../../../../mocks';
import {RequestApiService} from 'src/app/services/request-api.service';
import {SessionsClientService} from 'src/app/services/sessions-client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  public bills = [];
  public loading = true;
  @Input() mustShow = true;
  @Input() isSmall = false;

  constructor(
    private router: Router,
    private session: SessionsClientService,
    private http: RequestApiService
  ) {
  }

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills() {
    this.http.get('admon/factura/', null, true).subscribe(
      (response: any) => {
        this.loading = false;
        this.bills = response.results;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  showBillDetail(bill) {
    this.router.navigate(['/panel/bill-detail'], {
      queryParams: {
        ...bill
      },
    });
    localStorage.setItem('nextline-bill-details', JSON.stringify(bill.factuaradetalle_set));
  }
}
