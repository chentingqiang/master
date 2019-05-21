import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PriceunitTypeService } from '../../../../../service/priceunit-type.service';
@Component({
  selector: 'app-edit-priceuint-type',
  templateUrl: './edit-priceuint-type.component.html',
  styleUrls: ['./edit-priceuint-type.component.css']
})
export class EditPriceuintTypeComponent implements OnInit {
  list:any;
  paramsObj:any = {};
  constructor(public bsModalRef: BsModalRef, private http: HttpService,private msg:NzMessageService,public priceunitTypeService : PriceunitTypeService) { }

  ngOnInit() {
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
  }
  editPriceUnitType(){
    if(this.paramsObj.typeName == ''){this.msg.warning('请输入单位类型名称');return}
    this.http.post('/ApolloManagement/unitType/updateUnitType', {id:this.paramsObj.id,typeName:this.paramsObj.typeName}, res => {
      if (res.meta.success == true) {
        // alert('修改成功！');
        this.msg.success('修改成功！');
        this.priceunitTypeService.searchPriceUnitType();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'json');
  }
}
