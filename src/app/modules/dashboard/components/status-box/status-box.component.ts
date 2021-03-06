import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-status-box",
  templateUrl: "./status-box.component.html",
  styleUrls: ["./status-box.component.scss"],
})
export class StatusBoxComponent implements OnInit {
  @Input() status;
  @Input() statusDetail;
  @Input() isSmall = false;
  @Input() type = 'bill';

  constructor() {}

  ngOnInit(): void { }

  getColor(status) { 
    
    switch (status) {
      // tickets
      case 'A':
        return 'rgb(240 122 60) 0% 0% no-repeat padding-box';
      case 'S':
        return '#f5d569 0% 0% no-repeat padding-box';
      case 'f':
        return '#f5d569 0% 0% no-repeat padding-box';
     
        // bills
      case 'P':
        return '#58e9ad 0% 0% no-repeat padding-box';
      case 'C':
        return '#cbe83b 0% 0% no-repeat padding-box';
      case 'V':
        return '#c73407 0% 0% no-repeat padding-box';
      case 'G':
        return '#586ad4 0% 0% no-repeat padding-box';
      default:
        return '#52c0f2 0% 0% no-repeat padding-box'
    }
  }
  
}
