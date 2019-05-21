import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaseOutPrereportComponent } from './add-lease-out-prereport.component';

describe('AddLeaseOutPrereportComponent', () => {
  let component: AddLeaseOutPrereportComponent;
  let fixture: ComponentFixture<AddLeaseOutPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaseOutPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeaseOutPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
