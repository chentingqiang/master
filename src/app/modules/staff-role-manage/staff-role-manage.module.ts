import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { StaffRoleManageComponent } from '../../components/admin/pages/staff-role-manage/staff-role-manage.component';
import { StaffRoleManageRoutingModule } from './staff-role-manage-routing.module';

@NgModule({
  declarations: [StaffRoleManageComponent],
  imports: [
    ShareModule,
    StaffRoleManageRoutingModule
  ]
})
export class StaffRoleManageModule { }
