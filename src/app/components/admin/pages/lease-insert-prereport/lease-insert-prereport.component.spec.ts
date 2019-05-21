import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseInsertPrereportComponent } from './lease-insert-prereport.component';

describe('LeaseInsertPrereportComponent', () => {
  let component: LeaseInsertPrereportComponent;
  let fixture: ComponentFixture<LeaseInsertPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseInsertPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseInsertPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
