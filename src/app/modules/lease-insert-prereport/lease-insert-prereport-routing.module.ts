import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaseInsertPrereportComponent } from '../../components/admin/pages/lease-insert-prereport/lease-insert-prereport.component';
const routes: Routes = [
  { path: '', component: LeaseInsertPrereportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseInsertPrereportRoutingModule { }
