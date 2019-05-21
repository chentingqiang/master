import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { StockService } from '../../../../../service/stock.service';
import { NzMessageService } from 'ng-zorro-antd';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-renewal-stock',
  templateUrl: './renewal-stock.component.html',
  styleUrls: ['./renewal-stock.component.css']
})
export class RenewalStockComponent implements OnInit {
  list: any;
  provinceMap: any = new Map<number, string>();
  cityMap: any = new Map<number, string>();
  stockTypeMap: any;
  stockTypeList: any;
  cityList: any[] = [];
  rentTime: any = '';
  moreTime: any = null;
  days: any = 0;
  loadedFlag: any;
  loadedFlag1: any = false;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public stockService: StockService,
    private message: NzMessageService, public publicService: PublicService) { }
  ngOnInit() {
    this.rentTime = this.list.beginTime + ' - ' + this.list.endTime;
    this.moreTime = this.list.endTime;
    this.today = new Date(this.list.endTime);
    this.publicService.getProvince((data, map) => {
      this.provinceMap = map;
      this.setCity(this.list.provinceId);
    })
  }
  today:Date;
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };
  //计算续租天数
  countDays(e) {
    console.log(this.moreTime, this.list.endTime);
    if(e == null){return;}
    var time1: any = new Date(this.http.transDate(this.moreTime).replace(/-/g, "/")).getTime();
    var time2: any = new Date(this.list.endTime.replace(/-/g, "/")).getTime();
    console.log(time1, time2);
    if (time1 >= time2) {
      this.days = (time1 - time2) / (1000 * 60 * 60 * 24);
    }
  }
  //设置城市
  setCity(e: any) {
    if (e != '') {
      this.http.get("/ApolloManagement/area/getAreas", { 'level': 2, 'parentId': e }, resp => {
        for (let i = 0; i < resp.data.length; i++) {
          this.cityMap.set(resp.data[i].areaid, resp.data[i].areaname);//areaname
        }
        this.loadedFlag1 = true;
      });
    }
  }
  renewalStock() {
    console.log(this.moreTime);
    console.log(this.list);
    if (this.moreTime == null) { this.message.warning('请选择续租日期'); return }
    var data =
    {
      "endTime": this.moreTime == null ? "" : this.http.transDate(this.moreTime),
      "id": this.list.id
    };
    console.log(data);
    this.http.post('/ApolloManagement/warehouse/renewalWarehouse', data, res => {
      if (res.meta.success == true) {
        this.message.success('续租成功！');
        this.stockService.searchStock();
        this.bsModalRef.hide();
      }
    }, 'www');
  }
}
