import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceuintTypeComponent } from './add-priceuint-type.component';

describe('AddPriceuintTypeComponent', () => {
  let component: AddPriceuintTypeComponent;
  let fixture: ComponentFixture<AddPriceuintTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriceuintTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceuintTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
