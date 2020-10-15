import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCommitmentModalComponent } from './payment-commitment-modal.component';

describe('PaymentCommitmentModalComponent', () => {
  let component: PaymentCommitmentModalComponent;
  let fixture: ComponentFixture<PaymentCommitmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCommitmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCommitmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
