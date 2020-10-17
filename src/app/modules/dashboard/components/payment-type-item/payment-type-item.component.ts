import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-type-item',
  templateUrl: './payment-type-item.component.html',
  styleUrls: ['./payment-type-item.component.scss']
})
export class PaymentTypeItemComponent implements OnInit {
  @Input() id;
  @Input() name;
  @Input() icon = "";

  constructor() { }

  ngOnInit(): void {
  }

}
