import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PriceunitService } from '../../../../../service/priceunit.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-priceunit',
  templateUrl: './edit-priceunit.component.html',
  styleUrls: ['./edit-priceunit.component.css']
})
export class EditPriceunitComponent implements OnInit {
  public paramsObj:any = {};
  list:any;
  loadedFlag:any;
  priceUnitTypeList:any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService,public priceunitService: PriceunitService,
    private message: NzMessageService) { }
  ngOnInit() {
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
  }
  editPriceUnit(){
    if(this.paramsObj.name == ''){this.message.warning('请输入单位名称');return}
    if(this.paramsObj.typeId == ''){this.message.warning('请输入单位编号');return}
    this.http.post('/ApolloManagement/unit/updateUnit', {id:this.paramsObj.id,name:this.paramsObj.name,typeId:this.paramsObj.typeId}, res => {
      if (res.meta.success == true) {
        // alert('修改成功！');
        this.message.success('修改成功！');
        this.priceunitService.searchPriceUnit();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'json');
  }
}
