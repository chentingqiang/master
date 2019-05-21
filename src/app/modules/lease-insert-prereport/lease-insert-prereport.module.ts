import { NgModule } from '@angular/core';
import { LeaseInsertPrereportComponent } from '../../components/admin/pages/lease-insert-prereport/lease-insert-prereport.component';
import { LeaseInsertPrereportRoutingModule } from './lease-insert-prereport-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [LeaseInsertPrereportComponent],
  imports: [
    LeaseInsertPrereportRoutingModule,
    ShareModule
  ]
})
export class LeaseInsertPrereportModule { }
