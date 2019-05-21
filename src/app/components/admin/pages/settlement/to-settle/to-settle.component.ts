import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../service/http.service';
import { SettlementService } from '../../../../../service/settlement.service';
import { NzMessageService } from 'ng-zorro-antd';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-to-settle',
  templateUrl: './to-settle.component.html',
  styleUrls: ['./to-settle.component.css']
})
export class ToSettleComponent implements OnInit {
  list:any;
  editObj:any;
  paymentList:any[] = [];
  paymentMap:any;
  companyMap:any;
  stateMap:any;
  constructor(public bsModalRef: BsModalRef,public http: HttpService,public message: NzMessageService,public settlementService:SettlementService) { }

  ngOnInit() {
    this.editObj = JSON.parse(JSON.stringify(this.list));
  }
  confirm() {
    if(this.editObj.paymentId == null){this.message.warning('请选择结算方式');return}
    let companyId = JSON.parse(sessionStorage.getItem('user')).companyId;
    let data =
    {
      "companyId": companyId,
      "id": this.editObj.id,
      "paymentId": this.editObj.paymentId,//支付方式
      "tenantId": this.editObj.tenantId
    };
    console.log(data);
    this.http.post('/ApolloManagement/settle/doSelttle', data, res => {
      this.message.success('结算成功！');
      this.bsModalRef.hide();
      this.settlementService.search();
    }, 'json');
  }
}
