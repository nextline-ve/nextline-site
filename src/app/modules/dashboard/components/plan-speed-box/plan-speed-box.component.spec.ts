import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSpeedBoxComponent } from './plan-speed-box.component';

describe('PlanSpeedBoxComponent', () => {
  let component: PlanSpeedBoxComponent;
  let fixture: ComponentFixture<PlanSpeedBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSpeedBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSpeedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
