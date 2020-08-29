import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRequestComponent } from './services-request.component';

describe('ServicesRequestComponent', () => {
  let component: ServicesRequestComponent;
  let fixture: ComponentFixture<ServicesRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
