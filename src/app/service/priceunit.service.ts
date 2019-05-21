import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class PriceunitService {
  priceUnitName: any = '';//单位名称
  priceUnitTypeName: any = null;
  allpriceUnitList: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService, public load: Load) { }
  searchPriceUnit() {
    this.load.loading15 = true;
    var data =
    {
      "typeId": this.priceUnitTypeName == null ? "" : this.priceUnitTypeName,
      "name": this.priceUnitName
    }
    console.log(data);
    this.http.post('/ApolloManagement/unit/findUnit', data, res => {
      if (res.meta.success == true) {
        this.allpriceUnitList = res.data;
        this.load.loading15 = false;
      }
    }, 'json');
  }
}
