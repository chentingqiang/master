import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticManageComponent } from '../../components/admin/pages/statistic-manage/statistic-manage.component';
const routes: Routes = [
  { path: '', component: StatisticManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticManageRoutingModule { }
