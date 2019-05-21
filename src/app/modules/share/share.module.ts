import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/admin/header/header.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//共享组件共用面包屑导航
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
