import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { StockManageComponent } from '../../components/admin/pages/stock-manage/stock-manage.component';
import { StockManageRoutingModule } from './stock-manage-routing.module';

@NgModule({
  declarations: [StockManageComponent],
  imports: [
    ShareModule,
    StockManageRoutingModule
  ]
})
export class StockManageModule { }
