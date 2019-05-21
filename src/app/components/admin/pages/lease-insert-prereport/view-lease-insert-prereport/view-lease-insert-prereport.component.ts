import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';

@Component({
  selector: 'app-view-lease-insert-prereport',
  templateUrl: './view-lease-insert-prereport.component.html',
  styleUrls: ['./view-lease-insert-prereport.component.css']
})
export class ViewLeaseInsertPrereportComponent implements OnInit {
  previewVisible: boolean = false;
  cargoImageUrl: string = '';
  list: any;
  forcastTime: any = '';
  goodList: any[] = [];
  instorageCargoList: any[] = [];
  cargolist: any[] = [];
  companyMap: any;
  warehouseMap: any;
  stateMap: any;
  cargoMap: any = new Map<string, string>();
  standardMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  loadedFlag: boolean = false;//数据加载完毕
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public publicService: PublicService) { }

  ngOnInit() {
    console.log(this.list);
    this.forcastTime = this.list.beginTime + ' - ' + this.list.endTime;
    this.publicService.getCargoList((data, map) => {
      this.cargolist = data;
      this.cargoMap = map;
      this.publicService.getStandard((data, map) => {
        this.standardMap = map;
        this.publicService.getPriceUnit((data, map) => {
          this.priceUnitMap = map;
          this.getWareHouseList();
        });
      });
    });
  }
  //预览商品图片
  preview(url) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  //根据orderId获取货物清单
  getWareHouseList() {
    let id = this.list.id;
    let instorageId = this.list.instorageId == null ? "" : this.list.instorageId;
    this.http.post('/ApolloManagement/prereportIn/getReportCargo', { orderId: id, instorageId: instorageId }, res => {
      if (res.meta.success == true) {
        this.goodList = res.data.reportCargo;
        this.instorageCargoList = res.data.instorageCargo == null ? [] : res.data.instorageCargo;
        this.loadedFlag = true;
      }
    }, 'www');
  }
}
