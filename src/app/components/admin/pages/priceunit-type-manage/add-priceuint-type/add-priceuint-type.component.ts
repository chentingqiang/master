import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PriceunitTypeService } from '../../../../../service/priceunit-type.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-priceuint-type',
  templateUrl: './add-priceuint-type.component.html',
  styleUrls: ['./add-priceuint-type.component.css']
})
export class AddPriceuintTypeComponent implements OnInit {
  priceUnitTypeName:any = '';//名称
  constructor(public bsModalRef: BsModalRef, private http: HttpService,private msg:NzMessageService,public priceunitTypeService : PriceunitTypeService) { }
  ngOnInit() {
  }
  addPriceUnitType(){
    if(this.priceUnitTypeName == ''){this.msg.warning('请输入单位类型名称');return}
    this.http.post('/ApolloManagement/unitType/addUnitType', {typeName:this.priceUnitTypeName}, res => {
      if (res.meta.success == true) {
        // alert('添加成功！');
        this.msg.success('添加成功！');
        this.priceunitTypeService.searchPriceUnitType();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'json');
  }
}
