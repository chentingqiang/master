import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class OptInsertPrereportService {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  preReportNumber: any = '';
  companyName: any = null;
  stockCompanyId: any = '';
  stockName: any = null;
  startTime: any = null;
  endTime: any = null;
  status: any = null;
  cargoType: any = '';
  cargoId: any = '';
  prePortList: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService, public load: Load) { }
  searchPrereport() {
    if (sessionStorage.getItem('user')) {
      let startTime = this.startTime == null ? "" : this.http.transDate(this.startTime);
      let endTime = this.endTime == null ? "" : this.http.transDate(this.endTime);
      var data =
      {
        "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "preReportNumber": this.preReportNumber,
        "state": this.status == null ? "" : this.status,//库状态
        "tenantId": this.companyName == null ? "" : this.companyName,
        "warehouseId": this.stockName == null ? "" : this.stockName
      };
      let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
      console.log(data);
      this.load.loading11 = true;
      this.http.post('/ApolloManagement/prereportIn/findReportIn?beginDate=' + startTime + '&endDate=' + endTime + pagenation, data, res => {
        if (res.meta.success == true) {
          this.prePortList = res.data.list;
          this.pagenation.total = res.data.total;
          this.load.loading11 = false;
        }
      }, 'json');
    }
  }
}
