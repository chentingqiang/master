import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutStockManageComponent } from '../../components/admin/pages/out-stock-manage/out-stock-manage.component';
const routes: Routes = [
  { path: '', component: OutStockManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutStockManageRoutingModule { }
