import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginModalComponent} from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {
  }

  async ngOnInit() {
    const action = await localStorage.getItem('nextline-actions-open-login');
    if (action == 'open') {
      await localStorage.removeItem('nextline-actions-open-login');
      this.showLodingModal();
    }
  }

  showLodingModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '420px',
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
