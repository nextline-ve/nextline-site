import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plan-price-box',
  templateUrl: './plan-price-box.component.html',
  styleUrls: ['./plan-price-box.component.scss']
})
export class PlanPriceBoxComponent implements OnInit {

  @Input() bsPrice;
  @Input() $Price;
  constructor() { }

  ngOnInit(): void {
  }

}
