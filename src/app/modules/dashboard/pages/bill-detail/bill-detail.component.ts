import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestApiService} from 'src/app/services/request-api.service';
import {UtilsService} from 'src/app/services/utils.service';
import {environment} from '../../../../../environments/environment';
import {PaymentCommitmentModalComponent} from '../../components/payment-commitment-modal/payment-commitment-modal.component';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss'],
})
export class BillDetailComponent implements OnInit {
  public billId = null;
  public bill: any = {};
  public billDetails: any = [];
  public currencies = [];
  public domain = environment.DOMAIN;
  public isReady = false;
  public discount: any;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private http: RequestApiService,
    private utils: UtilsService
  ) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.billId = res.id;
      this.bill = {...res};
      this.formatDate();
      this.loadCurrencies();
    });
    this.billDetails = await JSON.parse(localStorage.getItem('nextline-bill-details'));
    this.itHasDiscount();
    this.isReady = true;
  }

  private itHasDiscount() {
    if (this.bill.monto_descuento < 1) {
      return;
    }
    for (const item of this.billDetails) {
      if (item.descuento) {
        this.discount = item;
      }
    }
  }


  loadCurrencies() {
    this.http.get('config/monedas/', null, true).subscribe(
      (response: any) => {
        this.currencies = response.results;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  formatDate() {
    this.bill.fecha_emision = this.utils.calculatePaymentDay(
      this.bill.fecha_emision
    );
  }

  payBill(method) {
    this.router.navigate(['/panel/bills/declare-payment'], {
      queryParams: {
        method,
        bill: this.billId
      },
    });
  }

  showPaymentCommitmentModal() {
    const dialogForgotRef = this.dialog.open(PaymentCommitmentModalComponent, {
      width: '420px',
      data: {
        billId: this.billId,
      },
    });
  }
}
