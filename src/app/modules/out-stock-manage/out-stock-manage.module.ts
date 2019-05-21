import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { OutStockManageComponent } from '../../components/admin/pages/out-stock-manage/out-stock-manage.component';
import { OutStockManageRoutingModule } from './out-stock-manage-routing.module';

@NgModule({
  declarations: [OutStockManageComponent],
  imports: [
    ShareModule,
    OutStockManageRoutingModule
  ]
})
export class OutStockManageModule { }
