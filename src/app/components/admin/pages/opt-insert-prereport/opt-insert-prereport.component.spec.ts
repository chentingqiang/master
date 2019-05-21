import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptInsertPrereportComponent } from './opt-insert-prereport.component';

describe('OptInsertPrereportComponent', () => {
  let component: OptInsertPrereportComponent;
  let fixture: ComponentFixture<OptInsertPrereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptInsertPrereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptInsertPrereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
