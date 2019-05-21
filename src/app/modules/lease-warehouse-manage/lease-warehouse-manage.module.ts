import { NgModule } from '@angular/core';
import { LeaseWarehouseManageComponent } from '../../components/admin/pages/lease-warehouse-manage/lease-warehouse-manage.component';
import { LeaseWarehouseManageRoutingModule } from './lease-warehouse-manage-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [LeaseWarehouseManageComponent],
  imports: [
    LeaseWarehouseManageRoutingModule,
    ShareModule
  ]
})
export class LeaseWarehouseManageModule { }
