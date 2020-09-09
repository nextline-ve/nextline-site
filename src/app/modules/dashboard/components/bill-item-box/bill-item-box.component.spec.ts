import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemBoxComponent } from './bill-item-box.component';

describe('BillItemBoxComponent', () => {
  let component: BillItemBoxComponent;
  let fixture: ComponentFixture<BillItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
