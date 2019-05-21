import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffManageComponent } from '../../components/admin/pages/staff-manage/staff-manage.component';
const routes: Routes = [
  { path: '', component: StaffManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManageRoutingModule { }
