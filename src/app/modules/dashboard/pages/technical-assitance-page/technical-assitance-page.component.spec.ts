import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAssitancePageComponent } from './technical-assitance-page.component';

describe('TechnicalAssitancePageComponent', () => {
  let component: TechnicalAssitancePageComponent;
  let fixture: ComponentFixture<TechnicalAssitancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalAssitancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalAssitancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
