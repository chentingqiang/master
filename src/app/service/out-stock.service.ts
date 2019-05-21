import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class OutStockService {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  startTime: any = null;
  endTime: any = null;
  cargoId: any = null;//货物id
  cargoType: any = null;//货物类型
  companyId: any = null;//租赁方
  warehouseId: any = null;//仓库id
  operator: any = null;//操作员
  state: any = null;//状态
  searchList: any[] = [];//搜索列表

  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
    //搜索
    toSearch() {
      this.load.loading14 = true;
      let beginDate = (this.startTime == null) ? "" : this.http.transDate(this.startTime);
      let endDate = (this.endTime == null) ? "" : this.http.transDate(this.endTime);
      var cargoId = this.cargoId == null ? "" : this.cargoId;
      var cargoType = this.cargoType == null ? "" : this.cargoType;
      var data =
      {
        "tenantId": this.companyId == null ? "" : this.companyId,
        "operatorId": this.operator == null ? "" : this.operator,
        "warehouseId": this.warehouseId == null ? "" : this.warehouseId,
        "state": this.state == null ? "" : this.state,
        "companyId": JSON.parse(sessionStorage.getItem('user')).companyId
      }
      console.log(data);
      let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
      this.http.post('/ApolloManagement/outStorage/findOutStorage?beginDate=' + beginDate + '&endDate=' + endDate + '&cargoId=' + cargoId + '&cargoType=' + cargoType + pagenation, data, res => {
        if (res.meta.success == true) {
          this.searchList = res.data.list;
          this.pagenation.total = res.data.total;
          this.load.loading14 = false;
        }
      }, 'json');
    }
}
