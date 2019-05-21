import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StockService } from '../../../../../service/stock.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  stockNumber: any = '';//仓库编号
  stockName: any = '';//仓库名称
  province_id: any = null;//省份
  city_id: any = null;//县市
  address: any = '';//详细地址
  rentTime: any = null;//租赁起止时间
  stockArea: any = null;//仓库面积
  stockType: any = null;//仓库类型
  remark: any = '';//备注
  provinceList: any;//
  cityList: any[] = [];//
  stockTypeList: any;
  loadedFlag: any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public stockService: StockService,
    private message: NzMessageService) { }

  ngOnInit() {
  }
  //选择省份
  selectProvince(e: any) {
    if (e != null) {
      this.http.get("/ApolloManagement/area/getAreas", { 'level': 2, 'parentId': e }, resp => {
        this.cityList = resp.data;
        this.city_id = null;
      });
    }
  }
  addStock() {
    if (this.stockNumber == '') { this.message.warning('请输入仓库编号'); return; }
    if (this.stockName == '') { this.message.warning('请输入仓库名称'); return; }
    if (this.province_id == null || this.city_id == null) { this.message.warning('请完善仓库地址'); return; }
    if (this.rentTime == null) { this.message.warning('请输入租赁起止时间'); return; }
    if (this.stockArea == null || this.stockArea < 0) { this.message.warning('请输入正确的仓库面积'); return; }
    if (this.stockType == null) { this.message.warning('请选择仓库类型'); return; }
    console.log(this.rentTime);
    var data =
    {
      "address": this.address,
      "area": this.stockArea,
      "beginTime": (this.rentTime == null) ? "" : this.http.transDate(this.rentTime[0]),
      "endTime": (this.rentTime == null) ? "" : this.http.transDate(this.rentTime[1]),
      "cityId": this.city_id,
      "descrption": this.remark,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "provinceId": this.province_id,
      // "resourceId": 0,
      "warehouseName": this.stockName,
      "warehouseNumber": this.stockNumber,
      "warehouseType": this.stockType
    };
    console.log(data);
    this.http.post('/ApolloManagement/warehouse/addWarehouse', data, res => {
      if (res.meta.success == true) {
        this.message.success('添加成功！');
        this.stockService.searchStock();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
