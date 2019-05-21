import { NgModule } from '@angular/core';
import { OptInsertPrereportComponent } from '../../components/admin/pages/opt-insert-prereport/opt-insert-prereport.component';
import { OptInsertPrereportRoutingModule } from './opt-insert-prereport-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [OptInsertPrereportComponent],
  imports: [
    ShareModule,
    OptInsertPrereportRoutingModule
  ]
})
export class OptInsertPrereportModule { }