import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthStaffRoleComponent } from './auth-staff-role.component';

describe('AuthStaffRoleComponent', () => {
  let component: AuthStaffRoleComponent;
  let fixture: ComponentFixture<AuthStaffRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthStaffRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthStaffRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
