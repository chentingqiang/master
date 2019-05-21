import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceuintTypeComponent } from './edit-priceuint-type.component';

describe('EditPriceuintTypeComponent', () => {
  let component: EditPriceuintTypeComponent;
  let fixture: ComponentFixture<EditPriceuintTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPriceuintTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPriceuintTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
