import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptInstockPrereportComponent } from './opt-instock-prereport.component';

describe('OptInstockPrereportComponent', () => {
  let component: OptInstockPrereportComponent;
  let fixture: ComponentFixture<OptInstockPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptInstockPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptInstockPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
