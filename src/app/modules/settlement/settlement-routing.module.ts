import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettlementComponent } from '../../components/admin/pages/settlement/settlement.component';
const routes: Routes = [
  { path: '', component: SettlementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettlementRoutingModule { }
