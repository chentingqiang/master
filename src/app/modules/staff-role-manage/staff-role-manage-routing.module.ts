import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffRoleManageComponent } from '../../components/admin/pages/staff-role-manage/staff-role-manage.component';
const routes: Routes = [
  { path: '', component: StaffRoleManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoleManageRoutingModule { }
