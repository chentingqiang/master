import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaseWarehouseManageComponent } from '../../components/admin/pages/lease-warehouse-manage/lease-warehouse-manage.component';
const routes: Routes = [
  { path: '', component: LeaseWarehouseManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseWarehouseManageRoutingModule { }
