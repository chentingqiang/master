import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpassStaffComponent } from './editpass-staff.component';

describe('EditpassStaffComponent', () => {
  let component: EditpassStaffComponent;
  let fixture: ComponentFixture<EditpassStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpassStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpassStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
