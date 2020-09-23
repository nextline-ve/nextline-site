import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeItemComponent } from './payment-type-item.component';

describe('PaymentTypeItemComponent', () => {
  let component: PaymentTypeItemComponent;
  let fixture: ComponentFixture<PaymentTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
