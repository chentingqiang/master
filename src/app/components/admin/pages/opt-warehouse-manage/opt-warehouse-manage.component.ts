import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { PublicService } from '../../../../service/public.service';
// import { saveAs } from "file-saver";
@Component({
  selector: 'app-opt-warehouse-manage',
  templateUrl: './opt-warehouse-manage.component.html',
  styleUrls: ['./opt-warehouse-manage.component.css']
})
export class OptWarehouseManageComponent implements OnInit {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  company: any = null;
  warehouseId: any = null;
  locationId: any = null;
  cargoId: any = null;
  allStockList: any[] = [];
  cargoList: any[] = [];//货物
  companyList: any[] = [];//运营公司
  warehouseList: any[] = [];//仓库
  locationList: any[] = [];//库位
  cargoMap: any = new Map<string, string>();//所有货物map
  locationMap: any = new Map<string, string>();//所有库位
  companyMap: any = new Map<string, string>();//所有公司map
  warehouseMap: any = new Map<string, string>();//所有仓库map
  constructor(private message: NzMessageService, private http: HttpService, public publicService: PublicService,public load:Load) { }
  mapOfExpandData: { [key: string]: boolean } = {};
  previewVisible: boolean = false;
  cargoImageUrl: any = '';
  //预览
  preView(url: string) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  ngOnInit() {
    this.load.loading13 = true;
    this.publicService.getCargoList((data, map) => {
      this.cargoList = data;
      this.cargoMap = map;
      this.publicService.getAllLocation((data, map) => {
        this.locationMap = map;
        if (sessionStorage.getItem('CargoExistNum') != null) {
          let objData = JSON.parse(sessionStorage.getItem('CargoExistNum'));
          sessionStorage.removeItem('CargoExistNum');
          this.publicService.getAllCompany((data, map) => {
            this.companyMap = map;
            this.companyList = data;
            // this.company = objData.companyId;
            this.publicService.getCompanyWarehouse((data, map) => {
              this.warehouseList = data;
              this.warehouseMap = map;
              this.warehouseId = objData.warehouseId;
              this.selectLocation(this.warehouseId, objData.locationId);
            });
          });
        } else {
          this.publicService.getCompanyWarehouse((data, map) => {
            this.warehouseList = data;
            this.warehouseMap = map;
            this.publicService.getAllCompany((data, map) => {
              this.companyMap = map;
              this.companyList = data;
              this.searchStock();
            });
          });
        }
      });
    });
  }
  //获取仓库库位
  selectLocation(warehouseId, locationId) {
    if (warehouseId == null) { return };
    console.log(warehouseId);
    this.publicService.getLocationId(warehouseId, (data, map) => {
      this.locationList = data;
      this.locationId = null;
      if (locationId) {
        this.locationId = locationId;
        this.searchStock();
      }
    });
  }
  exportTable() {
    console.log('导出表格');
    // const blob = new Blob([document.getElementById('exportableTable').innerHTML], {
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    // });
    // saveAs(blob, 'test.xls');
  }
  searchStock() {
    if (sessionStorage.getItem('user') != null) {
      var data =
      {
        "cargoId": (this.cargoId == null) ? "" : this.cargoId,
        "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "tenantId": (this.company == null) ? "" : this.company,
        "warehouseId": (this.warehouseId == null) ? "" : this.warehouseId,
        "locationId": this.locationId == null ? "" : this.locationId,
        "page": this.pagenation.page,
        "size": this.pagenation.size
      }
    }
    console.log(data);
    this.load.loading13 = true;
    this.http.post('/ApolloManagement/cargoInStorage/companyStockInfo', data, res => {
      if (res.meta.success == true) {
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].id = i + 1;
        }
        this.allStockList = res.data.list;
        this.pagenation.total = res.data.total;
        this.load.loading13 = false;
        console.log(this.allStockList);
      }
    }, "www");
  }
}