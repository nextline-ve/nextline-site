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
  public isBgWhite = true;

  constructor() {}

  ngOnInit(): void {
    // console.log("index", this.index);
    if (this.index % 2 !== 0) {
      console.log("this.index", this.index, this.index % 2);
      this.isBgWhite = false;
    }
  }
}
