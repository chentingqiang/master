import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { PriceunitTypeManageComponent } from '../../components/admin/pages/priceunit-type-manage/priceunit-type-manage.component';
import { PriceunitTypeManageRoutingModule } from './priceunit-type-manage-routing.module';

@NgModule({
  declarations: [PriceunitTypeManageComponent],
  imports: [
    ShareModule,
    PriceunitTypeManageRoutingModule
  ]
})
export class PriceunitTypeManageModule { }
