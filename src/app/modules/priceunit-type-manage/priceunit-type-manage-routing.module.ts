import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceunitTypeManageComponent } from '../../components/admin/pages/priceunit-type-manage/priceunit-type-manage.component';
const routes: Routes = [
  { path: '', component: PriceunitTypeManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceunitTypeManageRoutingModule { }
