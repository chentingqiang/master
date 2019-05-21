import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRoleManageComponent } from './staff-role-manage.component';

describe('StaffRoleManageComponent', () => {
  let component: StaffRoleManageComponent;
  let fixture: ComponentFixture<StaffRoleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRoleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRoleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
