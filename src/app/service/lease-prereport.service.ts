import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class LeasePrereportService {
  preReportNumber: any = '';
  stockCompanyId:any = '';
  iostock: any = '';
  stockName: any = '';
  startTime: any = null;
  endTime: any = null;
  status: any = '';
  prePortList: any[] = [];
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  constructor(private http: HttpService, private message: NzMessageService) { }
  //点击搜索
  searchWareHouse() {
    if (sessionStorage.getItem('user')) {
      let startTime = this.startTime == null?"":this.http.transDate(this.startTime);
      let endTime = this.endTime == null?"":this.http.transDate(this.endTime);
      var data =
      {
        "companyId":this.stockCompanyId,
        "preReportNumber": this.preReportNumber,
        "state": this.status,//库状态
        "tenantId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "warehouseId": this.stockName
      };
      let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
      console.log(data);
      this.http.post('/ApolloManagement/report/getPreReport?beginDate=' + startTime + '&endDate=' + endTime + pagenation, data, res => {
        if (res.meta.success == true) {
          this.prePortList = res.data.list;
          this.pagenation.total = res.data.total;
        } else {
          alert(res.meta.message);
        }
      }, 'json');
    }
  }
}
