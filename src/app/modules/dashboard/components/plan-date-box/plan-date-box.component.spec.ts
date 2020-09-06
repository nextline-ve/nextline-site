import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDateBoxComponent } from './plan-date-box.component';

describe('PlanDateBoxComponent', () => {
  let component: PlanDateBoxComponent;
  let fixture: ComponentFixture<PlanDateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
