import {Component, OnInit} from '@angular/core';
import {
  MatDialog,
} from "@angular/material/dialog";
import { LoginModalComponent } from "../login-modal/login-modal.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  showLodingModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: "420px",
    });

  }

}
