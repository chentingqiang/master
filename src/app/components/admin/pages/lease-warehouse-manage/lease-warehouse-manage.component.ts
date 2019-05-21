import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { PublicService } from '../../../../service/public.service';
@Component({
  selector: 'app-lease-warehouse-manage',
  templateUrl: './lease-warehouse-manage.component.html',
  styleUrls: ['./lease-warehouse-manage.component.css']
})
export class LeaseWarehouseManageComponent implements OnInit {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  company: any = null;
  warehouseId: any = null;
  cargoId: any = null;
  allStockList: any[] = [];
  cargoList: any[] = [];//货物
  companyList: any[] = [];//运营方公司
  warehouseList: any[] = [];//仓库
  cargoMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  constructor(private message: NzMessageService, private http: HttpService, 
    public publicService: PublicService,public load:Load) { }
  mapOfExpandData: { [key: string]: boolean } = {};
  previewVisible: boolean = false;
  cargoImageUrl: any = '';
  //预览
  preView(url: string) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  ngOnInit() {
    this.publicService.getStockList((data, map) => {
      this.warehouseMap = map;
      this.publicService.getAllCompany((data, map) => {
        this.companyMap = map;
        this.publicService.getOperatorCompany((data, map) => {
          this.companyList = data;
          this.publicService.getCargoList((data, map) => {
            this.cargoList = data;
            this.cargoMap = map;
            this.searchStock();
          })
        })
      })
    })
  }
  searchStock() {
    if (sessionStorage.getItem('user') != null) {
      this.load.loading10 = true;
      var data =
      {
        "cargoId": (this.cargoId == null) ? "" : this.cargoId,
        "companyId": (this.company == null) ? "" : this.company,
        "tenantId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "warehouseId": (this.warehouseId == null) ? "" : this.warehouseId,
        "page": this.pagenation.page,
        "size": this.pagenation.size
      }
    }
    console.log(data);
    this.http.post('/ApolloManagement/cargoInStorage/tenantStockInfo', data, res => {
      if (res.meta.success == true) {
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].id = i + 1;
        }
        this.allStockList = res.data.list;
        this.pagenation.total = res.data.total;
        console.log(this.allStockList);
        this.load.loading10 = false;
      }
    }, "www");
  }
  // //根据公司获取仓库列表
  selectType(val) {
    console.log(val);
    if (val != null) {
      this.http.post('/ApolloManagement/warehouse/getCompanyWarehouse', { companyId: val }, res => {
        if (res.meta.success == true) {
          this.warehouseList = res.data;
        }
      }, "www");
    } else {
      this.warehouseList = [];
      this.warehouseId = null;
    }
  }
}
