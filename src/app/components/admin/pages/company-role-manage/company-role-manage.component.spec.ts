import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRoleManageComponent } from './company-role-manage.component';

describe('CompanyRoleManageComponent', () => {
  let component: CompanyRoleManageComponent;
  let fixture: ComponentFixture<CompanyRoleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRoleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRoleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
