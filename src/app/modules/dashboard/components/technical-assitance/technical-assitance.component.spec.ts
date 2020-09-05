import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAssitanceComponent } from './technical-assitance.component';

describe('TechnicalAssitanceComponent', () => {
  let component: TechnicalAssitanceComponent;
  let fixture: ComponentFixture<TechnicalAssitanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalAssitanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalAssitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
