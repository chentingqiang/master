import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsManageComponent } from '../../components/admin/pages/goods-manage/goods-manage.component';
const routes: Routes = [
  { path: '', component: GoodsManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsManageRoutingModule { }
