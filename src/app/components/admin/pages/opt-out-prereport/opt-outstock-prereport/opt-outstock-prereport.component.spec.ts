import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptOutstockPrereportComponent } from './opt-outstock-prereport.component';

describe('OptOutstockPrereportComponent', () => {
  let component: OptOutstockPrereportComponent;
  let fixture: ComponentFixture<OptOutstockPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptOutstockPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptOutstockPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
