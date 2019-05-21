import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCompanyRoleComponent } from './auth-company-role.component';

describe('AuthCompanyRoleComponent', () => {
  let component: AuthCompanyRoleComponent;
  let fixture: ComponentFixture<AuthCompanyRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCompanyRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCompanyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
