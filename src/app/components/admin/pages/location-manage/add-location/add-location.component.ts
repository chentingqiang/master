import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { LocationService } from '../../../../../service/location.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  stockList: any;//仓库列表
  locationTypeList:any;//库位类型
  locationNumber: any = '';//库位编号
  locationName: any = '';//库位名称
  locationType: any = '';//库位类型
  warehouseId: any = '';//仓库id
  remark: any = "";//备注
  loadedFlag:any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public locationService: LocationService,
    private message: NzMessageService) { }

  ngOnInit() {
    console.log(this.loadedFlag);
  }
  addLocation() {
    if(this.locationName == ''){this.message.warning('请输入库位名称');return;}
    if(this.locationNumber == ''){this.message.warning('请输入库位编号');return;}
    if(this.locationType == ''){this.message.warning('请选择库位类型');return;}
    if(this.warehouseId == ''){this.message.warning('请选择仓库');return;}
    var data =
    {
      "description": this.remark,
      "typeId": this.locationType,
      "warehoseId": this.warehouseId,
      "warehouseLocationName": this.locationName,
      "warehouseLocationNumber": this.locationNumber
    };
    this.http.post('/ApolloManagement/location/addLocation', data, res => {
      if (res.meta.success == true) {
        this.message.success('添加成功！');
        this.locationService.searchLocation();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
