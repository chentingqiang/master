import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOptOutPrereportComponent } from './view-opt-out-prereport.component';

describe('ViewOptOutPrereportComponent', () => {
  let component: ViewOptOutPrereportComponent;
  let fixture: ComponentFixture<ViewOptOutPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOptOutPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOptOutPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
