import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { StaffManageComponent } from '../../components/admin/pages/staff-manage/staff-manage.component';
import { StaffManageRoutingModule } from './staff-manage-routing.module';

@NgModule({
  declarations: [StaffManageComponent],
  imports: [
    ShareModule,
    StaffManageRoutingModule
  ]
})
export class StaffManageModule { }
