import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntoStockManageComponent } from '../../components/admin/pages/into-stock-manage/into-stock-manage.component';
const routes: Routes = [
  { path: '', component: IntoStockManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntoStockManageRoutingModule { }
