import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { StatisticManageComponent } from '../../components/admin/pages/statistic-manage/statistic-manage.component';
import { ShareModule } from '../share/share.module';
import { StatisticManageRoutingModule } from './statistic-manage-routing.module';

@NgModule({
  declarations: [StatisticManageComponent],
  imports: [
    // CommonModule,
    StatisticManageRoutingModule,
    ShareModule
  ]
})
export class StatisticManageModule { }
