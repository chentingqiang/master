import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  goodsNumber: any = '';//货物编号
  goodsName: any = '';//货物名称
  goodsType: any = null;//货物类别
  allGoodsList: any[] = [];
  constructor(private http: HttpService,public load:Load) {}
  searchGoods() {
    var data =
    {
      "cargoName": this.goodsName,//货物名称
      "cargoNumber": this.goodsNumber,
      "typeId": this.goodsType==null?"":this.goodsType,
    }
    this.load.loading6 = true;
    console.log(data);
    this.http.post('/ApolloManagement/cargo/findCargo', data, res => {
      if (res.meta.success == true) {
        this.allGoodsList = res.data;
       this.load.loading6 = false;
      }
    }, 'json');
  }
}
