import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationManageComponent } from '../../components/admin/pages/location-manage/location-manage.component';
const routes: Routes = [
  { path: '', component: LocationManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationManageRoutingModule { }
