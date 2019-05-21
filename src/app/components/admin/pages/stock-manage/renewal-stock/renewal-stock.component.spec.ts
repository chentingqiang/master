import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalStockComponent } from './renewal-stock.component';

describe('RenewalStockComponent', () => {
  let component: RenewalStockComponent;
  let fixture: ComponentFixture<RenewalStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
