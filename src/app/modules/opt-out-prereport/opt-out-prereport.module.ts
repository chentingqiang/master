import { NgModule } from '@angular/core';
import { OptOutPrereportComponent } from '../../components/admin/pages/opt-out-prereport/opt-out-prereport.component';
import { OptOutPrereportRoutingModule } from './opt-out-prereport-routing.module';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [OptOutPrereportComponent],
  imports: [
    OptOutPrereportRoutingModule,
    ShareModule
  ]
})
export class OptOutPrereportModule { }
