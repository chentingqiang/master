import { NgModule } from '@angular/core';
import { GoodsManageComponent } from '../../components/admin/pages/goods-manage/goods-manage.component';
import { ShareModule } from '../share/share.module';
import { GoodsManageRoutingModule } from './goods-manage-routing.module';

@NgModule({
  declarations: [GoodsManageComponent],
  imports: [
    GoodsManageRoutingModule,
    ShareModule
  ]
})
export class GoodsManageModule { }
