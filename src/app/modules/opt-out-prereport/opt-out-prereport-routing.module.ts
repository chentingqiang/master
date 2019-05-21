import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptOutPrereportComponent } from '../../components/admin/pages/opt-out-prereport/opt-out-prereport.component';
const routes: Routes = [
  { path: '', component: OptOutPrereportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptOutPrereportRoutingModule { }
