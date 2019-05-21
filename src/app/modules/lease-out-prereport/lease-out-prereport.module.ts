import { NgModule } from '@angular/core';
import { LeaseOutPrereportComponent } from '../../components/admin/pages/lease-out-prereport/lease-out-prereport.component';
import { LeaseOutPrereportRoutingModule } from './lease-out-prereport-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [LeaseOutPrereportComponent],
  imports: [
    LeaseOutPrereportRoutingModule,
    ShareModule
  ]
})
export class LeaseOutPrereportModule { }
