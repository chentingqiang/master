import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptOutPrereportComponent } from './opt-out-prereport.component';

describe('OptOutPrereportComponent', () => {
  let component: OptOutPrereportComponent;
  let fixture: ComponentFixture<OptOutPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptOutPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptOutPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
