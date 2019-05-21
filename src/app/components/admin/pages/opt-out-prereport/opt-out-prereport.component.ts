import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { PublicService } from '../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { OptOutPrereportService } from '../../../../service/opt-out-prereport.service';
import { OptOutstockPrereportComponent } from '../opt-out-prereport/opt-outstock-prereport/opt-outstock-prereport.component';
import { ViewOptOutPrereportComponent } from '../opt-out-prereport/view-opt-out-prereport/view-opt-out-prereport.component';
// import { ViewLeaseOutPrereportComponent } from '../lease-out-prereport/view-lease-out-prereport/view-lease-out-prereport.component';

@Component({
  selector: 'app-opt-out-prereport',
  templateUrl: './opt-out-prereport.component.html',
  styleUrls: ['./opt-out-prereport.component.css'],
  providers: [BsModalRef]
})
export class OptOutPrereportComponent implements OnInit {
  stockList: any[] = [];//所有仓库
  stateList: any[] = [];
  cargoList: any[] = [];
  companyList: any[] = [];//所有公司
  settlementList: any[] = [];
  deliverTypeList: any[] = [];
  standardList: any[] = [];
  idx: any;
  stateMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, any>();
  warehouseMaps: any = new Map<string, any>();
  companyMap: any = new Map<string, string>();
  operatorMap: any = new Map<string, string>();//操作员map
  deliverTypeMap: any = new Map<string, string>();
  standardMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  settlementMap: any = new Map<string, string>();
  optNumber: any = '';
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public optPrereportService: OptOutPrereportService,
    public publicService: PublicService,
    private message: NzMessageService,
    public load:Load
  ) { }
  ngOnInit() {
    this.load.loading12 = true;
    if (sessionStorage.getItem('optNumber') != null) {
      this.optPrereportService.preReportNumber = sessionStorage.getItem('optNumber');
      this.optPrereportService.companyName = null;
      this.optPrereportService.stockName = null;
      this.optPrereportService.startTime = null;
      this.optPrereportService.endTime = null;
      this.optPrereportService.status = null;
      sessionStorage.removeItem('optNumber');
    }
    this.publicService.getAllCompany((datas, maps) => {
      this.companyList = datas;
      this.companyMap = maps;
      this.publicService.getOperator((datas, maps) => {
        this.operatorMap = maps;
        //获取货物列表
        this.publicService.getCargoList((datas, maps) => {
          this.cargoList = datas;
          this.cargoMap = maps;
          this.publicService.getStatus((datas, maps) => {
            this.stateList = datas;
            this.stateMap = maps;
            //获取包装规格
            this.publicService.getStandard((datas, maps) => {
              this.standardList = datas;
              this.standardMap = maps;
              //获取计价单位
              this.publicService.getPriceUnit((datas, maps) => {
                this.priceUnitMap = maps;
                //获取提货方式
                this.publicService.getDeliverType((datas, maps) => {
                  this.deliverTypeList = datas;
                  this.deliverTypeMap = maps;
                  //获取结算方式
                  this.publicService.getVariablePayment((datas, maps) => {
                    this.settlementList = datas;
                    this.settlementMap = maps;
                    //获取所有仓库
                    this.publicService.getStockList((datas, maps,maps1) => {
                      this.stockList = datas;
                      this.warehouseMap = maps;
                      this.warehouseMaps = maps1;
                      this.loadedFlag = true;
                      console.log(this.loadedFlag);
                      this.searchPrereport();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  ngAfterViewInit(): void {
  }
  //登记出库
  toStockPrereport(obj: any) {
    const initialState = {
      list: obj,
      warehouseMap: this.warehouseMap,
      stateMap: this.stateMap,
      companyMap: this.companyMap,
      cargoMap: this.cargoMap,
      standardMap: this.standardMap,
      standardList: this.standardList,
      priceUnitMap: this.priceUnitMap,
      deliverTypeList: this.deliverTypeList,
      deliverTypeMap: this.deliverTypeMap,
      settlementMap: this.settlementMap,
      settlementList: this.settlementList,
      cargoList: this.cargoList,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      OptOutstockPrereportComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-xll' })
    );
  }
  //搜索
  searchPrereport() {
    this.optPrereportService.searchPrereport();
  }
  //预览
  viewPrereport(obj: any) {
    const initialState = {
      list: obj,
      stateMap: this.stateMap,
      warehouseMap: this.warehouseMap,
      companyMap: this.companyMap,
      cargoMap: this.cargoMap,
      standardMap: this.standardMap,
      priceUnitMap: this.priceUnitMap,
      deliverTypeMap: this.deliverTypeMap
    };
    this.bsModalRef = this.modalService.show(
      ViewOptOutPrereportComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
  //选择仓库
  changeStock(val) {
    console.log(val);
    var flag = false;
    //遍历到该仓库对应的公司
    for (let i = 0; i < this.stockList.length; i++) {
      if (this.stockList[i].id == val) {
        this.optPrereportService.stockCompanyId = this.stockList[i].company_id;
        flag = true;
      }
    }
    if (!flag) {
      this.optPrereportService.stockCompanyId = "";
    }
  }
}
