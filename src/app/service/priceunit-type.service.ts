import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class PriceunitTypeService {
  priceUnitName: any = '';//单位名称
  allpriceUnitTypesList: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService, public load: Load) { }
  searchPriceUnitType() {
    this.load.loading16 = true;
    var data =
    {
      "typeName": this.priceUnitName
    }
    console.log(data);
    this.http.post('/ApolloManagement/unitType/findUnitType', data, res => {
      if (res.meta.success == true) {
        this.allpriceUnitTypesList = res.data;
        this.load.loading16 = false;
      }
    }, 'json');
  }
}
