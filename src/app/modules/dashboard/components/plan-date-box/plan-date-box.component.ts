import {Component, OnInit, Input} from '@angular/core';
import {UtilsService} from 'src/app/services/utils.service';

@Component({
  selector: 'app-plan-date-box',
  templateUrl: './plan-date-box.component.html',
  styleUrls: ['./plan-date-box.component.scss'],
})
export class PlanDateBoxComponent implements OnInit {
  @Input() date = null;
  @Input() soicitationStatus = null;
  public dateFormated;

  constructor(private utils: UtilsService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.calculateDate();
    }, 2000);
  }

  calculateDate() {
    if (this.date) {
      this.dateFormated = this.utils.calculatePaymentDay(this.date);
    }
  }
}
