import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseOutPrereportComponent } from './lease-out-prereport.component';

describe('LeaseOutPrereportComponent', () => {
  let component: LeaseOutPrereportComponent;
  let fixture: ComponentFixture<LeaseOutPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseOutPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseOutPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
