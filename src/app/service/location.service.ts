import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationNumber: any = null;//库位编号
  locationName: any = null;//库位名称
  locationType: any = null;//库位类型
  warehouseId: any = null;//仓库id
  locationList: any[] = [];//库位列表
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
  searchLocation() {
    if(this.warehouseId == null){this.message.warning('请选择仓库名称!');return}
    var data = 
    {
      "typeId": this.locationType == null?"":this.locationType,
      "warehoseId": this.warehouseId == null?"":this.warehouseId,
      "warehouseLocationName": this.locationName == null?"":this.locationName,
      "warehouseLocationNumber": this.locationNumber == null?"":this.locationNumber,
    };
    console.log(data);
    this.load.loading11 = true;
    this.http.post('/ApolloManagement/location/findLocation', data, res => {
      if (res.meta.success == true) {
        this.locationList = res.data;
        this.load.loading11 = false;
      }
    }, 'json');
  }
}
