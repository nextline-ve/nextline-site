import { Component, OnInit, Input } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-bill-item-box",
  templateUrl: "./bill-item-box.component.html",
  styleUrls: ["./bill-item-box.component.scss"],
})
export class BillItemBoxComponent implements OnInit {
  @Input() id;
  @Input() index;
  @Input() status;
  @Input() statusDetail;
  @Input() date;
  @Input() bolivar;
  @Input() dolar;
  @Input() isSmall = false;
  public dateFormated = null;
  public isBgWhite = true;

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    if (this.index % 2 !== 0) {
      this.isBgWhite = false;
    }
    setTimeout(() => {
      this.formatDate();
    }, 1500);
  }

  formatDate() {
    this.dateFormated = this.utils.calculatePaymentDay(this.date);
  }
}
