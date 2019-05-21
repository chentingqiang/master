import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { NgZorroAntdModule} from 'ng-zorro-antd';
import { ShareModule } from '../share/share.module';
import { CompanyManageRoutingModule } from './company-manage-routing.module';
import { CompanyManageComponent } from '../../components/admin/pages/company-manage/company-manage.component';

@NgModule({
  declarations: [
    CompanyManageComponent
  ],
  imports: [
    // CommonModule,
    CompanyManageRoutingModule,
    ShareModule
    // FormsModule,
    // ReactiveFormsModule,
    // NgZorroAntdModule
  ]
})
export class CompanyManageModule { }
