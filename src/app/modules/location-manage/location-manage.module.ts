import { NgModule } from '@angular/core';
import { LocationManageComponent } from '../../components/admin/pages/location-manage/location-manage.component';
import { LocationManageRoutingModule } from './location-manage-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [LocationManageComponent],
  imports: [
    LocationManageRoutingModule,
    ShareModule
  ]
})
export class LocationManageModule { }
