import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstockComponent } from './view-instock.component';

describe('ViewInstockComponent', () => {
  let component: ViewInstockComponent;
  let fixture: ComponentFixture<ViewInstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
