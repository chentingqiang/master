import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { NgZorroAntdModule} from 'ng-zorro-antd';
import { CompanyRoleManageComponent } from '../../components/admin/pages/company-role-manage/company-role-manage.component';
import { CompanyRoleManageRoutingModule } from './company-role-manage-routing.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [CompanyRoleManageComponent],
  imports: [
    CompanyRoleManageRoutingModule,
    ShareModule
  ]
})
export class CompanyRoleManageModule { }
