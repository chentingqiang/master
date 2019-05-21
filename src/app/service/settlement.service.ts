import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class SettlementService {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  timeSlot: any = null;//时间段
  tenantId: any = null;//租赁公司
  state: any = null;//状态
  paymentId:any = null;//支付方式
  lists: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
  search() {
    let companyId = JSON.parse(sessionStorage.getItem('user')).companyId;
    let tenantId = this.tenantId == null ? "" : this.tenantId;
    if (this.timeSlot != null && this.timeSlot != '') {
      var d = new Date(this.timeSlot);
      var settleDate = d.getFullYear() + '-' + (d.getMonth() + 1);
      console.log(settleDate);
    } else {
      this.message.warning('请选择结算年月'); return;
    }
    this.load.loading17 = true;
    let data =
    {
      "companyId": companyId,
      "state": this.state == null ? "" : this.state,
      "tenantId": tenantId,
      "settleDate": settleDate,
      "paymentId": this.paymentId==null?"":this.paymentId
    };
    console.log(data);
    let pagenation = "?page=" + this.pagenation.page + "&size=" + this.pagenation.size;
    this.http.post('/ApolloManagement/settle/getSettle'+pagenation, data, res => {
      this.lists = res.data.list;
      this.pagenation.total = res.data.total;
      this.load.loading17 = false;
    }, 'json');
  }
}
