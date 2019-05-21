import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptInsertPrereportComponent } from '../../components/admin/pages/opt-insert-prereport/opt-insert-prereport.component';
const routes: Routes = [
  { path: '', component: OptInsertPrereportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptInsertPrereportRoutingModule { }
