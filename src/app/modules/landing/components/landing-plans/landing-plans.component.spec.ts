import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPlansComponent } from './landing-plans.component';

describe('LandingPlansComponent', () => {
  let component: LandingPlansComponent;
  let fixture: ComponentFixture<LandingPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
