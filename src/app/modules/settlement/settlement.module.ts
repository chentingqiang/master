import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { SettlementComponent } from '../../components/admin/pages/settlement/settlement.component';
import { SettlementRoutingModule } from './settlement-routing.module';
@NgModule({
  declarations: [SettlementComponent],
  imports: [
    ShareModule,
    SettlementRoutingModule
  ]
})
export class SettlementModule { }
