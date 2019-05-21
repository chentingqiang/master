import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceunitTypeManageComponent } from './priceunit-type-manage.component';

describe('PriceunitTypeManageComponent', () => {
  let component: PriceunitTypeManageComponent;
  let fixture: ComponentFixture<PriceunitTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceunitTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceunitTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
