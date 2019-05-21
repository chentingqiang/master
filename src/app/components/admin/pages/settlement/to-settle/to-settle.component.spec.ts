import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSettleComponent } from './to-settle.component';

describe('ToSettleComponent', () => {
  let component: ToSettleComponent;
  let fixture: ComponentFixture<ToSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
