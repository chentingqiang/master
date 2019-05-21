import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { OptOutPrereportService } from '../../../../../service/opt-out-prereport.service';
@Component({
  selector: 'app-view-opt-out-prereport',
  templateUrl: './view-opt-out-prereport.component.html',
  styleUrls: ['./view-opt-out-prereport.component.css']
})
export class ViewOptOutPrereportComponent implements OnInit {
  list: any;
  forcastTime: any = '';
  goodList: any[] = [];
  outstorageCargoList: any[] = [];
  cargolist: any[] = [];
  companyMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  stateMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  standardMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  deliverTypeMap: any = new Map<string, string>();//提货方式
  constructor(public bsModalRef: BsModalRef, private http: HttpService,private message:NzMessageService,private optOutPrereportService:OptOutPrereportService) { }

  ngOnInit() {
    console.log(this.list);
    this.list.totalAmounts = 0;
    this.forcastTime = this.list.beginTime + ' - ' + this.list.endTime;
    this.getWareHouseList();
  }
  previewVisible: boolean = false;
  cargoImageUrl: string = '';
  //预览商品图片
  preview(url) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  //根据orderId获取货物清单
  getWareHouseList() {
    let id = this.list.id;
    let outstorageId = this.list.outstorageId == null ? "" : this.list.outstorageId;
    this.http.post('/ApolloManagement/prereportOut/getReportCargo', { orderId: id, outstorageId: outstorageId }, res => {
      if (res.meta.success == true) {
        let sum = 0;
        for(let i=0;i<res.data.reportCargo.length;i++){
          sum += res.data.reportCargo[i].price * res.data.reportCargo[i].quantity
        }
        this.list.totalAmounts = sum;
        this.goodList = res.data.reportCargo;
        console.log(this.goodList);
        this.outstorageCargoList = res.data.outstorageCargo == null ? [] : res.data.outstorageCargo;
      }
    }, 'www');
  }
  //确认审核
  confirm(){
    this.http.post('/ApolloManagement/prereportOut/auditMoney', { id:this.list.id }, res => {
      this.message.success('审核通过！');
      this.bsModalRef.hide();
      this.optOutPrereportService.searchPrereport();
      // this.
    }, 'www');
  }
}