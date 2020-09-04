import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLinkComponent } from './nav-bar-link.component';

describe('NavBarLinkComponent', () => {
  let component: NavBarLinkComponent;
  let fixture: ComponentFixture<NavBarLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
