import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptWarehouseManageComponent } from './opt-warehouse-manage.component';

describe('OptWarehouseManageComponent', () => {
  let component: OptWarehouseManageComponent;
  let fixture: ComponentFixture<OptWarehouseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptWarehouseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptWarehouseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
