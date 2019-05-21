import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceunitComponent } from './edit-priceunit.component';

describe('EditPriceunitComponent', () => {
  let component: EditPriceunitComponent;
  let fixture: ComponentFixture<EditPriceunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPriceunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPriceunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
