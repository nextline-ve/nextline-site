import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('scroll', ['$event'])
  scroll(event) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('header').style.background = 'white';
    } else {
      document.getElementById('header').style.background = 'transparent';
    }
  }

}
