import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockNumber: any = '';//仓库编号
  stockName: any = '';//仓库名称
  province_id: any = null;//省份id
  city_id: any = null;//市县id
  // companyId: any = '';//企业id
  stockType: any = null;//仓库类型
  // expireTime: any = '';//到期时间
  allStockList: any[] = [];//搜索的仓库列表
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
  searchStock() {
    this.load.loading18 = true;
    var data =
    {
      "cityId": this.city_id == null ? "" : this.city_id,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "provinceId": this.province_id == null ? "" : this.province_id,
      // "resourceId": 0,
      "warehouseName": this.stockName,
      "warehouseNumber": this.stockNumber,
      "warehouseType": this.stockType == null ? "" : this.stockType
    };
    console.log(data);
    this.http.post('/ApolloManagement/warehouse/getWarehouseInfo', data, res => {
      if (res.meta.success == true) {
        this.allStockList = res.data;
        this.load.loading18 = false;
      }
    }, 'json');
  }
}
