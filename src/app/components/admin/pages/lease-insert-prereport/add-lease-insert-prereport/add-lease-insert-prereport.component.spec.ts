import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaseInsertPrereportComponent } from './add-lease-insert-prereport.component';

describe('AddLeaseInsertPrereportComponent', () => {
  let component: AddLeaseInsertPrereportComponent;
  let fixture: ComponentFixture<AddLeaseInsertPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaseInsertPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeaseInsertPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
