import {Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-item-box',
  templateUrl: './ticket-item-box.component.html',
  styleUrls: ['./ticket-item-box.component.scss'],
})
export class TicketItemBoxComponent implements OnInit {
  @Input() id;
  @Input() status;
  @Input() statusDetail;
  @Input() subject;
  @Input() date;

  constructor() {
  }

  ngOnInit(): void {
    this.date = moment(this.date).format('DD/MM/YYYY');
  }
}
