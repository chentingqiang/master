import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class OptPrereportService {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  preReportNumber: any = '';
  companyName: any = '';
  stockCompanyId: any = '';
  iostock: any = '';
  stockName: any = '';
  startTime: any = '';
  endTime: any = '';
  status: any = '';
  cargoType:any = '';
  cargoId:any = '';
  prePortList: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService) { }
  searchPrereport() {
    //用户在线
    if (sessionStorage.getItem('user')) {
      console.log('获取用户');
      let applicant: any = JSON.parse(sessionStorage.getItem('user'));
      let companyId = applicant.companyId;
      var data =
      {
        "companyId": companyId,//
        "preReportNumber": this.preReportNumber,//预报单号
        // "reviewerId": 0,
        "state": this.status,//库状态
        "tenantId": this.companyName,//租户id
        "warehouseId": this.stockName//仓库id
      };
      let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
      let url = "&cargoId=" + this.cargoId + "&cargoType=" + this.cargoType;
      console.log(data, $('#startTime').val(), $('#endTime').val());
      this.http.post('/ApolloManagement/report/getPreReport?beginDate=' + $('#startTime').val() + '&endDate=' + $('#endTime').val() + pagenation, data, res => {
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
