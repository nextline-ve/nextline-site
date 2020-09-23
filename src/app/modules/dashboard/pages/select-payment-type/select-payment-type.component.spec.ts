import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaymentTypeComponent } from './select-payment-type.component';

describe('SelectPaymentTypeComponent', () => {
  let component: SelectPaymentTypeComponent;
  let fixture: ComponentFixture<SelectPaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPaymentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
