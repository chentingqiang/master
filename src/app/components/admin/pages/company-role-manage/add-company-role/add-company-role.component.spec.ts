import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyRoleComponent } from './add-company-role.component';

describe('AddCompanyRoleComponent', () => {
  let component: AddCompanyRoleComponent;
  let fixture: ComponentFixture<AddCompanyRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
