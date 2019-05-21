import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyManageComponent } from '../../components/admin/pages/company-manage/company-manage.component';
const routes: Routes = [
  { path: '', component: CompanyManageComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyManageRoutingModule { }