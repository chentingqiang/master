import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaseInsertPrereportComponent } from './view-lease-insert-prereport.component';

describe('ViewLeaseInsertPrereportComponent', () => {
  let component: ViewLeaseInsertPrereportComponent;
  let fixture: ComponentFixture<ViewLeaseInsertPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeaseInsertPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaseInsertPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
