import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../../../service/public.service';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { StatisticManageService } from '../../../../service/statistic-manage.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-statistic-manage',
  templateUrl: './statistic-manage.component.html',
  styleUrls: ['./statistic-manage.component.css']
})
export class StatisticManageComponent implements OnInit {
  beginDate: any = null;
  endDate: any = null;
  driverId: any = null;
  minNum: any = '';
  driverList: any[] = [];
  driverMap: any = new Map<string, string>();
  sendList: any[] = [];
  constructor(public publicService: PublicService, private http: HttpService,
    public load: Load, public statisticManageService: StatisticManageService, private message: NzMessageService) { }

  ngOnInit() {
    this.publicService.getOperator((data, map) => {
      this.driverList = data;
      this.driverMap = map;
    })
  }
  search() {
    let companyId = JSON.parse(sessionStorage.getItem('user')).companyId;
    if (this.beginDate == null) { this.message.warning('请选择起始时间'); return; }
    if (this.endDate == null) { this.message.warning('请选择结束时间'); return; }
    if (this.minNum == '') { this.message.warning('请输入最小数量'); return; }
    if (this.minNum < 0) { this.message.warning('数量格式错误'); return; }
    this.load.loading3 = true;
    let beginDate = this.http.transDate(this.beginDate);
    let endDate = this.http.transDate(this.endDate);
    let driverId = this.driverId == null ? "" : this.driverId;
    this.http.post('/ApolloManagement/statistics/getDriverStatis?beginDate=' + beginDate + '&companyId=' + companyId + '&driverId=' + driverId + '&endDate='+endDate+'&minNum='+this.minNum, {}, res => {
      this.sendList = res.data;
      this.load.loading3 = false;
    }, 'json')
  }
}
