import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStockManageComponent } from './out-stock-manage.component';

describe('OutStockManageComponent', () => {
  let component: OutStockManageComponent;
  let fixture: ComponentFixture<OutStockManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStockManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStockManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
