import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-bill-item-box",
  templateUrl: "./bill-item-box.component.html",
  styleUrls: ["./bill-item-box.component.scss"],
})
export class BillItemBoxComponent implements OnInit {
  @Input() id;
  @Input() index;
  @Input() status;
  @Input() date;
  @Input() bolivar;
  @Input() dolar;
  @Input() isSmall = false;

  public isBgWhite = true;

  constructor() {}

  ngOnInit(): void {
    if (this.index % 2 !== 0) {
      this.isBgWhite = false;
    }
  }
}
