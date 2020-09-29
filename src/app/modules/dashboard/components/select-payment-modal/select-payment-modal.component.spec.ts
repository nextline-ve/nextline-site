import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaymentModalComponent } from './select-payment-modal.component';

describe('SelectPaymentModalComponent', () => {
  let component: SelectPaymentModalComponent;
  let fixture: ComponentFixture<SelectPaymentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPaymentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
