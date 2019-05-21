import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoStockManageComponent } from './into-stock-manage.component';

describe('IntoStockManageComponent', () => {
  let component: IntoStockManageComponent;
  let fixture: ComponentFixture<IntoStockManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntoStockManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntoStockManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
