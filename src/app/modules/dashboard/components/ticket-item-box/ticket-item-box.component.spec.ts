import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketItemBoxComponent } from './ticket-item-box.component';

describe('TicketItemBoxComponent', () => {
  let component: TicketItemBoxComponent;
  let fixture: ComponentFixture<TicketItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
