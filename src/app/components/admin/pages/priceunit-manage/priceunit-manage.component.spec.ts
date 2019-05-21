import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceunitManageComponent } from './priceunit-manage.component';

describe('PriceunitManageComponent', () => {
  let component: PriceunitManageComponent;
  let fixture: ComponentFixture<PriceunitManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceunitManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceunitManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
