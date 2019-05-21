import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaseOutPrereportComponent } from '../../components/admin/pages/lease-out-prereport/lease-out-prereport.component';
const routes: Routes = [
  { path: '', component: LeaseOutPrereportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseOutPrereportRoutingModule { }
