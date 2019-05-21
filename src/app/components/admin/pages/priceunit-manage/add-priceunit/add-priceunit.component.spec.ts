import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceunitComponent } from './add-priceunit.component';

describe('AddPriceunitComponent', () => {
  let component: AddPriceunitComponent;
  let fixture: ComponentFixture<AddPriceunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriceunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
