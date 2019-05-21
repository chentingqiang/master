import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyRoleManageComponent } from '../../components/admin/pages/company-role-manage/company-role-manage.component';
const routes: Routes = [
  { path: '', component: CompanyRoleManageComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoleManageRoutingModule { }
