import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { LocationService } from '../../../../service/location.service';
import { PublicService } from '../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { EditLocationComponent } from "../location-manage/edit-location/edit-location.component";
import { AddLocationComponent } from "../location-manage/add-location/add-location.component";
@Component({
  selector: 'app-location-manage',
  templateUrl: './location-manage.component.html',
  styleUrls: ['./location-manage.component.css'],
  providers: [BsModalRef]
})
export class LocationManageComponent implements OnInit {
  // locationList: any[] = [];//库位列表
  stockList: any[] = [];//仓库列表
  locationTypeList: any[] = [];//库位类型
  cargoMap: any = new Map<string, string>();//所有货物map
  locationMap: any = new Map<string, string>();//所有库位
  companyMap: any = new Map<string, string>();//所有公司map
  warehouseMap: any = new Map<string, string>();//所有仓库map
  warehouseMaps: any = new Map<string, string>();//所有仓库map(name)
  locationTypeMap: any = new Map<string, string>();
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public locationService: LocationService,
    private message: NzMessageService,
    public publicService: PublicService,
    public router: Router
  ) { }
  ngOnInit() {
    //获取仓库列表
    this.publicService.getStockList((data, map1,map2) => {
      this.stockList = data;
      this.warehouseMap = map1;
      this.warehouseMaps = map2;
      //获取库位类型
      this.publicService.getLocationTypeList((data, map) => {
        this.locationTypeList = data;
        this.locationTypeMap = map;
        this.loadedFlag = true;
        this.publicService.getCargoList((data, map) => {
          this.cargoMap = map;
          this.publicService.getAllLocation((data, map) => {
            this.locationMap = map;
            this.publicService.getAllCompany((data, map) => {
              this.companyMap = map;
            });
          });
        });
      });
    });
  }
  //添加库位
  addLocation() {
    const initialState = {
      stockList: this.stockList,
      locationTypeList: this.locationTypeList,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      AddLocationComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  searchLocation() {
    this.locationService.searchLocation();
  }
  //查看库存
  viewStock(obj: any) {
    let data =
    {
      "locationId": obj.id,
      // "cargoId":"",
      "companyId": this.warehouseMap.get(obj.warehoseId).company_id,
      // "tenantId":"",
      "warehouseId": obj.warehoseId
    };
    sessionStorage.setItem('CargoExistNum', JSON.stringify(data));
    this.router.navigate(['/admin/opt-warehouse-manage']);
  }
  editLocation(obj: any) {
    const initialState = {
      list: obj,
      stockList: this.stockList,
      locationTypeList: this.locationTypeList,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      EditLocationComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  //确认删除
  deleteLocation(id): void {
    console.log(id);
    this.http.post('/ApolloManagement/location/deleteLocation', { locationId: id }, res => {
      console.log(res);
      if (res.meta.success == true) {
        this.message.success('删除成功!');
      }
    }, 'www');
  }
}