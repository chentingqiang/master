import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { OptWarehouseManageComponent } from '../../components/admin/pages/opt-warehouse-manage/opt-warehouse-manage.component';
import { OptWarehouseManageRoutingModule } from './opt-warehouse-manage-routing.module';

@NgModule({
  declarations: [OptWarehouseManageComponent],
  imports: [
    ShareModule,
    OptWarehouseManageRoutingModule
  ]
})
export class OptWarehouseManageModule { }
