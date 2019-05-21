import { NgModule } from '@angular/core';
import { IntoStockManageComponent } from '../../components/admin/pages/into-stock-manage/into-stock-manage.component';
import { IntoStockManageRoutingModule } from './into-stock-manage-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [IntoStockManageComponent],
  imports: [
    IntoStockManageRoutingModule,
    ShareModule
  ]
})
export class IntoStockManageModule { }
