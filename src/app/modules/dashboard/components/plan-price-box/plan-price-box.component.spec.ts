import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPriceBoxComponent } from './plan-price-box.component';

describe('PlanPriceBoxComponent', () => {
  let component: PlanPriceBoxComponent;
  let fixture: ComponentFixture<PlanPriceBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPriceBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPriceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
