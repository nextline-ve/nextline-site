import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {
  @Input() userType;
  @Input() type;
  @Input() name;
  @Input() date;
  @Input() avatar;
  @Input() message;
  public defaultAvatar = '../../../../../assets/images/imagotipo.png';
  public floatContainer = 'float-right';

  constructor() {
  }

  ngOnInit(): void {
    if (this.userType) {
      this.floatContainer = 'float-right';
    } else {
      this.floatContainer = 'float-left';
    }
  }
}
