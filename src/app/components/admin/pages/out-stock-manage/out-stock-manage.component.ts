import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { PublicService } from '../../../../service/public.service';
import { OutStockService } from '../../../../service/out-stock.service';
import { ViewOutstockComponent } from './view-outstock/view-outstock.component';
import { DeliverGoodsComponent } from './deliver-goods/deliver-goods.component';
@Component({
  selector: 'app-out-stock-manage',
  templateUrl: './out-stock-manage.component.html',
  styleUrls: ['./out-stock-manage.component.css'],
  providers: [BsModalRef]
})
export class OutStockManageComponent implements OnInit {
  warehouseMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  operatorMap: any = new Map<string, string>();
  stateMap: any = new Map<string, string>();
  deliverTypeMap: any = new Map<string, string>();
  deliverTypeList: any[] = [];
  stockList: any[] = [];//仓库列表
  cargoList: any[] = [];//货物列表
  statusList: any[] = [];
  cargoTypeList: any[] = [
  ];//货物类型列表
  companyList: any[] = [];//所有租赁公司列表
  operatorList: any[] = [];//操作员列表
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public publicService: PublicService,
    public outStockService: OutStockService,
    public load:Load
  ) { }
  ngOnInit() {
    this.load.loading14 = true;
    //获取仓库
    this.publicService.getCompanyWarehouse((datas, maps) => {
      this.stockList = datas;
      this.warehouseMap = maps;
      //获取所有租赁公司
      this.publicService.getAllCompany((datas, maps) => {
        this.companyList = datas;
        this.companyMap = maps;
        //获取所有出库货物
        this.publicService.getCargoList((datas, maps) => {
          this.cargoList = datas;
          this.cargoMap = maps;
          //获取操作员
          this.publicService.getOperator((datas, maps) => {
            this.operatorList = datas;
            this.operatorMap = maps;
            //获取出库状态
            this.publicService.getOutStatus((datas, maps) => {
              this.statusList = datas;
              this.stateMap = maps;
              //提货方式
              this.publicService.getDeliverType((datas, maps) => {
                this.deliverTypeList = datas;
                this.deliverTypeMap = maps;
                this.loadedFlag = true;
                this.toSearch();
              })
            })
          })
        })
      })
    })
  }
  //搜索
  toSearch() {
    this.outStockService.toSearch();
  }
  //预览
  toView(obj: any) {
    const initialState = {
      list: obj,
      cargoMap: this.cargoMap,
      warehouseMap: this.warehouseMap,
      companyMap: this.companyMap,
      operatorMap: this.operatorMap,
      deliverTypeMap: this.deliverTypeMap,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      ViewOutstockComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
  //发货
  toDeliver(obj: any) {
    console.log(obj);
    const initialState = {
      list: obj,
      cargoMap: this.cargoMap,
      warehouseMap: this.warehouseMap,
      companyMap: this.companyMap,
      operatorMap: this.operatorMap
    };
    this.bsModalRef = this.modalService.show(
      DeliverGoodsComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
}