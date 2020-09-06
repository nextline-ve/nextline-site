import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-item-box',
  templateUrl: './ticket-item-box.component.html',
  styleUrls: ['./ticket-item-box.component.scss']
})
export class TicketItemBoxComponent implements OnInit {

  @Input() id;
  @Input() status;
  @Input() subject;
  @Input() date;
  constructor() { }

  ngOnInit(): void {
  }

}
