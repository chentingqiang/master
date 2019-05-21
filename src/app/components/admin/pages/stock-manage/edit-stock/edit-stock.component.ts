import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StockService } from '../../../../../service/stock.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {
  list: any;
  public paramsObj: any = {};
  provinceList: any;
  stockTypeList: any;
  cityList: any[] = [];
  rentTime: any = '';
  loadedFlag: any;
  loadedFlag1: any = false;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public stockService: StockService,
    private message: NzMessageService) { }
  ngOnInit() {
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
    // this.rentTime = [this.paramsObj.beginTime, this.paramsObj.endTime];
    // this.rentTime = this.paramsObj.beginTime + ' 至 ' + this.paramsObj.endTime;
    if (this.paramsObj.provinceId != '') {
      this.http.get("/ApolloManagement/area/getAreas", { 'level': 2, 'parentId': this.paramsObj.provinceId }, resp => {
        this.cityList = resp.data;
        this.loadedFlag1 = true;
      });
    }
  }
  //选择省份
  selectProvince(e: any) {
    if (e != null) {
      this.http.get("/ApolloManagement/area/getAreas", { 'level': 2, 'parentId': e }, resp => {
        this.cityList = resp.data;
        this.paramsObj.cityId = null;
      });
    }
  }
  editStock() {
    console.log(this.paramsObj);
    if (this.paramsObj.warehouseNumber == '') { this.message.warning('请输入仓库编号'); return; }
    if (this.paramsObj.warehouseName == '') { this.message.warning('请输入仓库名称'); return; }
    if (this.paramsObj.provinceId == null || this.paramsObj.cityId == null) { this.message.warning('请完善仓库地址'); return; }
    // if (this.rentTime == null) { this.message.warning('请输入租赁起止时间'); return; }
    if (this.paramsObj.area == null || this.paramsObj.area < 0) { this.message.warning('请输入正确的仓库面积'); return; }
    if (this.paramsObj.warehouseType == null) { this.message.warning('请选择仓库类型'); return; }
    var data =
    {
      "address": this.paramsObj.address,
      "area": this.paramsObj.area,
      "cityId": this.paramsObj.cityId,
      "descrption": this.paramsObj.descrption,
      "provinceId": this.paramsObj.provinceId,
      // "resourceId": 0,
      "warehouseName": this.paramsObj.warehouseName,
      "warehouseNumber": this.paramsObj.warehouseNumber,
      "warehouseType": this.paramsObj.warehouseType,
      "id": this.paramsObj.id
    };
    console.log(data);
    this.http.post('/ApolloManagement/warehouse/updateWarehouse', data, res => {
      if (res.meta.success == true) {
        this.message.success('修改成功！');
        this.stockService.searchStock();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
