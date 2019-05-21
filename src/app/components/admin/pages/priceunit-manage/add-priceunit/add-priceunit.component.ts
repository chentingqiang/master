import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PriceunitService } from '../../../../../service/priceunit.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-priceunit',
  templateUrl: './add-priceunit.component.html',
  styleUrls: ['./add-priceunit.component.css']
})
export class AddPriceunitComponent implements OnInit {
  priceUnitNumber:any = '';
  priceUnitTypeName:any = '';
  priceUnitName:any = '';
  priceUnitTypeList:any;
  loadedFlag:any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService,public priceunitService: PriceunitService,
    private message: NzMessageService) { }

  ngOnInit() {
  }
  addPriceUnit(){
    if(this.priceUnitTypeName == ''){this.message.warning('请选择单位类型');return}
    if(this.priceUnitName == ''){this.message.warning('请输入单位名称');return}
    if(this.priceUnitNumber == ''){this.message.warning('请输入单位编号');return}
    var data = 
    {
      "code": this.priceUnitNumber,
      "name": this.priceUnitName,
      "typeId": this.priceUnitTypeName
    }
    this.http.post('/ApolloManagement/unit/addUnit', data, res => {
      if (res.meta.success == true) {
        // alert('添加成功！');
        this.message.success('添加成功！');
        this.priceunitService.searchPriceUnit();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'json');
  }
}
