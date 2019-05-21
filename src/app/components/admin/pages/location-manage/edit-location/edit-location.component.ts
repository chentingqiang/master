import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { LocationService } from '../../../../../service/location.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  public paramsObj: any = {};
  list: any;
  stockList: any;//仓库列表
  locationTypeList: any;
  loadedFlag:any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public locationService: LocationService,
    private message: NzMessageService) { }

  ngOnInit() {
    console.log(this.list);
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
  }
  editLocation() {
    console.log(this.list);
    if (this.paramsObj.warehouseLocationName == '') { this.message.warning('请输入库位名称'); return; }
    if (this.paramsObj.typeId == '') { this.message.warning('请选择库位类型'); return; }
    if (this.paramsObj.warehoseId == '') { this.message.warning('请选择仓库'); return; }
    var data =
    {
      "id": this.paramsObj.id,
      "description": this.paramsObj.description,
      "typeId": this.paramsObj.typeId,
      "warehoseId": this.paramsObj.warehoseId,
      "warehouseLocationName": this.paramsObj.warehouseLocationName,
      "warehouseLocationNumber": this.paramsObj.warehouseLocationNumber
    };
    this.http.post('/ApolloManagement/location/updateLocation', data, res => {
      if (res.meta.success == true) {
        this.message.success('编辑成功！!');
        this.locationService.searchLocation();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
