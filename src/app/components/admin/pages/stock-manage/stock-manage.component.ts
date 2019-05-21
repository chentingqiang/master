import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { StockService } from '../../../../service/stock.service';
import { PublicService } from '../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { EditStockComponent } from "../stock-manage/edit-stock/edit-stock.component";
import { AddStockComponent } from "../stock-manage/add-stock/add-stock.component";
import { RenewalStockComponent } from "../stock-manage/renewal-stock/renewal-stock.component";
@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css'],
  providers: [BsModalRef]
})
export class StockManageComponent implements OnInit {
  stockTypeList: any[] = [];//仓库类型列表
  companyList: any[] = [];//
  provinceList: any[] = [];//
  cityList: any[] = [];//
  companyMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  stockTypeMap: any = new Map<string, string>();
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public bsModalRef1: BsModalRef,
    public stockService: StockService,
    private message: NzMessageService,
    public publicService: PublicService,
    public load:Load
  ) { }

  ngOnInit() {
    this.load.loading18 = true;
    //获取仓库类型
    this.publicService.getStockTypeList((data, map) => {
      this.stockTypeList = data;
      this.stockTypeMap = map;
      this.publicService.getProvince((data) => {
        this.provinceList = data;
        this.publicService.getAllCompany((data) => {
          this.companyList = data;
          this.companyMap = map;
          this.loadedFlag = true;
          this.stockService.searchStock();
        });
      });
    });
  }
  //选择省份
  selectProvince(e: any) {
    if (e != null) {
      this.http.get("/ApolloManagement/area/getAreas", { 'level': 2, 'parentId': e }, resp => {
        this.cityList = resp.data;
        this.stockService.city_id = null;
      });
    }
  }
  addStock() {
    const initialState = {
      provinceList: this.provinceList,
      stockTypeList: this.stockTypeList,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      AddStockComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  searchStock() {
    this.stockService.searchStock();
  }
  editStock(obj: any) {
    const initialState = {
      list: obj,
      provinceList: this.provinceList,
      stockTypeList: this.stockTypeList,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      EditStockComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  //续租
  renewalStock(obj: any) {
    const initialState = {
      list: obj,
      provinceList: this.provinceList,
      stockTypeList: this.stockTypeList,
      stockTypeMap:this.stockTypeMap,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      RenewalStockComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  //确认删除
  deleteStock(id): void {
    // this.http.post('', { id: id }, res => {
    //   console.log(res);
    //   if (res.meta.success == true) {
    //     alert('删除成功');
    //     this.bsModalRef1.hide();
    //   }
    // }, 'www');
  }
}
