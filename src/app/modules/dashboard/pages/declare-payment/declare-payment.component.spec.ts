import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarePaymentComponent } from './declare-payment.component';

describe('DeclarePaymentComponent', () => {
  let component: DeclarePaymentComponent;
  let fixture: ComponentFixture<DeclarePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
