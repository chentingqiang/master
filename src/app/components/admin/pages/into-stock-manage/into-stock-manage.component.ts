import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { PublicService } from '../../../../service/public.service';
import { Load } from '../../../../service/load';
import { ViewInstockComponent } from '../into-stock-manage/view-instock/view-instock.component';
@Component({
  selector: 'app-into-stock-manage',
  templateUrl: './into-stock-manage.component.html',
  styleUrls: ['./into-stock-manage.component.css'],
  providers: [BsModalRef]
})
export class IntoStockManageComponent implements OnInit {
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  warehouseMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  operatorMap: any = new Map<string, string>();
  idx: any;
  startTime: any = null;
  endTime: any = null;
  cargoId: any = null;//货物id
  cargoType: any = null;//货物类型
  companyId: any = null;//租赁方
  warehouseId: any = null;//仓库id
  operator: any = null;//操作员
  searchList: any[] = [];//搜索列表
  stockList: any[] = [];//仓库列表
  cargoList: any[] = [];//货物列表
  cargoTypeList: any[] = [];//货物类型列表
  companyList: any[] = [];//所有租赁公司列表
  operatorList: any[] = [];//操作员列表
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public publicService: PublicService,
    public bsModalRef: BsModalRef,
    public load: Load
  ) { }
  ngOnInit() {
    this.load.loading7 = true;
    //获取公司仓库
    this.publicService.getCompanyWarehouse((datas, maps) => {
      this.stockList = datas;
      this.warehouseMap = maps;
      //获取所有租赁公司
      this.publicService.getAllCompany((datas, maps) => {
        this.companyList = datas;
        this.companyMap = maps;
        //获取所有货物
        this.publicService.getCargoList((datas, maps) => {
          this.cargoList = datas;
          this.cargoMap = maps;
          //获取操作员
          this.publicService.getOperator((datas, maps) => {
            this.operatorList = datas;
            this.operatorMap = maps;
            this.toSearch();
          })
        })
      })
    })
  }
  //搜索
  toSearch() {
    this.load.loading7 = true;
    let beginDate = (this.startTime == null) ? "" : this.http.transDate(this.startTime);
    let endDate = (this.endTime == null) ? "" : this.http.transDate(this.endTime);
    var cargoId = this.cargoId == null ? "" : this.cargoId;
    var cargoType = this.cargoType == null ? "" : this.cargoType;
    var data =
    {
      "tenantId": this.companyId == null ? "" : this.companyId,
      "operatorId": this.operator == null ? "" : this.operator,
      "warehouseId": this.warehouseId == null ? "" : this.warehouseId,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId
    }
    console.log(data);
    let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
    this.http.post('/ApolloManagement/inStorage/findCargoInStorage?beginDate=' + beginDate + '&endDate=' + endDate + '&cargoId=' + cargoId + '&cargoType=' + cargoType + pagenation, data, res => {
      if (res.meta.success == true) {
        this.searchList = res.data.list;
        this.pagenation.total = res.data.total;
        this.load.loading7 = false;
      }
    }, 'json');
  }
  //预览
  toView(obj: any) {
    const initialState = {
      list: obj,
      cargoMap: this.cargoMap,
      warehouseMap: this.warehouseMap,
      companyMap: this.companyMap,
      operatorMap: this.operatorMap
    };
    this.bsModalRef = this.modalService.show(
      ViewInstockComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
}
