import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOutstockComponent } from './view-outstock.component';

describe('ViewOutstockComponent', () => {
  let component: ViewOutstockComponent;
  let fixture: ComponentFixture<ViewOutstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOutstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOutstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
