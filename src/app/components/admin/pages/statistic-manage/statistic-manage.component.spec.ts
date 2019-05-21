import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticManageComponent } from './statistic-manage.component';

describe('StatisticManageComponent', () => {
  let component: StatisticManageComponent;
  let fixture: ComponentFixture<StatisticManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
