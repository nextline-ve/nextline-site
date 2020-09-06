import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plan-date-box',
  templateUrl: './plan-date-box.component.html',
  styleUrls: ['./plan-date-box.component.scss']
})
export class PlanDateBoxComponent implements OnInit {

  @Input() date;
  constructor() { }

  ngOnInit(): void {
  }

}
