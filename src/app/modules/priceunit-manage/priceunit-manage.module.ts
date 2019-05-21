import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { PriceunitManageComponent } from '../../components/admin/pages/priceunit-manage/priceunit-manage.component';
import { PriceunitManageRoutingModule } from './priceunit-manage-routing.module';

@NgModule({
  declarations: [PriceunitManageComponent],
  imports: [
    ShareModule,
    PriceunitManageRoutingModule
  ]
})
export class PriceunitManageModule { }
