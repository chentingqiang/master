import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Load } from './load';
@Injectable({
  providedIn: 'root'
})
export class OptOutPrereportService {
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
  prePortList: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
  searchPrereport() {
    if (sessionStorage.getItem('user')) {
      let startTime = this.startTime == null ? "" : this.http.transDate(this.startTime);
      let endTime = this.endTime == null ? "" : this.http.transDate(this.endTime);
      var data =
      {
        "companyId": this.stockCompanyId,
        "preReportNumber": this.preReportNumber,
        "state": this.status == null ? "" : this.status,
        "tenantId": this.companyName == null ? "" : this.companyName,
        "warehouseId": this.stockName == null ? "" : this.stockName
      };
      let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
      console.log(data);
      this.load.loading12 = true;
      this.http.post('/ApolloManagement/prereportOut/findReportOut?beginDate=' + startTime + '&endDate=' + endTime + pagenation, data, res => {
        if (res.meta.success == true) {
          this.prePortList = res.data.list;
          this.pagenation.total = res.data.total;
          this.load.loading12 = false;
        }
      }, 'json');
    }
  }

}
