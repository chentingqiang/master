import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptWarehouseManageComponent } from '../../components/admin/pages/opt-warehouse-manage/opt-warehouse-manage.component';
const routes: Routes = [
  { path: '', component: OptWarehouseManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptWarehouseManageRoutingModule { }
