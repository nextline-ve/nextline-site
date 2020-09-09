import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bill-item-box',
  templateUrl: './bill-item-box.component.html',
  styleUrls: ['./bill-item-box.component.scss']
})
export class BillItemBoxComponent implements OnInit {

  @Input() id;
  @Input() status;
  @Input() date;
  @Input() bolivar;
  @Input() dolar;
  constructor() { }

  ngOnInit(): void {
  }

}
