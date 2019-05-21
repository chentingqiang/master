import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseWarehouseManageComponent } from './lease-warehouse-manage.component';

describe('LeaseWarehouseManageComponent', () => {
  let component: LeaseWarehouseManageComponent;
  let fixture: ComponentFixture<LeaseWarehouseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseWarehouseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseWarehouseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
