import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLinkDividerComponent } from './nav-bar-link-divider.component';

describe('NavBarLinkDividerComponent', () => {
  let component: NavBarLinkDividerComponent;
  let fixture: ComponentFixture<NavBarLinkDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarLinkDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarLinkDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
