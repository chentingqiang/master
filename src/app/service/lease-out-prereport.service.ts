import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class LeaseOutPrereportService {
  preReportNumber: any = '';
  stockCompanyId: any = '';
  stockName: any = null;
  startTime: any = null;
  endTime: any = null;
  status: any = null;
  prePortList: any[] = [];
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
  //点击搜索
  search() {
    if (sessionStorage.getItem('user')) {
      this.load.loading9 = true;
      let startTime = this.startTime == null ? "" : this.http.transDate(this.startTime);
      let endTime = this.endTime == null ? "" : this.http.transDate(this.endTime);
      var data =
      {
        "companyId": this.stockCompanyId,
        "preReportNumber": this.preReportNumber,
        "state": this.status == null ? "" : this.status,//库状态
        "tenantId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "warehouseId": this.stockName == null ? "" : this.stockName
      };
      let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
      console.log(data);
      this.http.post('/ApolloManagement/prereportOut/findReportOut?beginDate=' + startTime + '&endDate=' + endTime + pagenation, data, res => {
        if (res.meta.success == true) {
          this.prePortList = res.data.list;
          this.pagenation.total = res.data.total;
          this.load.loading9 = false;
        }
      }, 'json');
    }
  }
}
