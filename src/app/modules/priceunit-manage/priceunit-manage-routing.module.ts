import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceunitManageComponent } from '../../components/admin/pages/priceunit-manage/priceunit-manage.component';
const routes: Routes = [
  { path: '', component: PriceunitManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceunitManageRoutingModule { }
