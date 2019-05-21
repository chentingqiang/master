import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaseOutPrereportComponent } from './view-lease-out-prereport.component';

describe('ViewLeaseOutPrereportComponent', () => {
  let component: ViewLeaseOutPrereportComponent;
  let fixture: ComponentFixture<ViewLeaseOutPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeaseOutPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaseOutPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
