import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { PublicService } from '../../../../service/public.service';
import { Load } from '../../../../service/load';
import { NzMessageService } from 'ng-zorro-antd';
import { OptInsertPrereportService } from '../../../../service/opt-insert-prereport.service';
import { OptInstockPrereportComponent } from '../opt-insert-prereport/opt-instock-prereport/opt-instock-prereport.component';
import { ViewLeaseInsertPrereportComponent } from '../lease-insert-prereport/view-lease-insert-prereport/view-lease-insert-prereport.component';

@Component({
  selector: 'app-opt-insert-prereport',
  templateUrl: './opt-insert-prereport.component.html',
  styleUrls: ['./opt-insert-prereport.component.css'],
  providers: [BsModalRef]
})
export class OptInsertPrereportComponent implements OnInit {
  stockList: any[] = [];//所有仓库
  stateList: any[] = [];
  cargoList: any[] = [];
  companyList: any[] = [];//所有公司
  settlementList: any[] = [];
  measureList: any[] = [];
  idx: any;
  stateMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  operatorMap: any = new Map<string, string>();//操作员map
  settlementMap: any = new Map<string, string>();
  measureMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  optNumber: any = '';
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public optPrereportService: OptInsertPrereportService,
    public publicService: PublicService,
    public load:Load,
    private message: NzMessageService
  ) { }
  ngOnInit() {
    this.load.loading11 = true;
    if (sessionStorage.getItem('optNumber') != null) {
      this.optPrereportService.preReportNumber = sessionStorage.getItem('optNumber');
      this.optPrereportService.companyName = null;
      this.optPrereportService.stockName = null;
      this.optPrereportService.startTime = null;
      this.optPrereportService.endTime = null;
      this.optPrereportService.status = null;
      sessionStorage.removeItem('optNumber');
    }
    this.publicService.getCompanyWarehouse((datas, maps) => {
      this.stockList = datas;
      this.warehouseMap = maps;
      this.publicService.getAllCompany((datas, maps) => {
        this.companyList = datas;
        this.companyMap = maps;
        this.publicService.getCargoList((datas, maps) => {
          this.cargoList = datas;
          this.cargoMap = maps;
          this.publicService.getStatus((datas, maps) => {
            this.stateList = datas;
            this.stateMap = maps;
            this.publicService.getOperator((datas, maps) => {
              this.operatorMap = maps;
              //获取结算方式
              this.publicService.getVariablePayment((datas, maps) => {
                this.settlementList = datas;
                this.settlementMap = maps;
                //获取规格
                this.publicService.getStandard((datas, maps) => {
                  this.measureList = datas;
                  this.measureMap = maps;
                  //计价单位
                  this.publicService.getPriceUnit((datas, maps) => {
                    this.priceUnitMap = maps;
                    this.loadedFlag = true;
                    this.searchPrereport();
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  //登记入库
  toStockPrereport(obj: any) {
    const initialState = {
      list: obj,
      stateMap: this.stateMap,
      warehouseMap: this.warehouseMap,
      companyMap: this.companyMap,
      cargoMap: this.cargoMap,
      cargolist: this.cargoList,
      settlementList: this.settlementList,
      settlementMap: this.settlementMap,
      measureList: this.measureList,
      standardMap: this.measureMap,
      priceUnitMap: this.priceUnitMap,
      loadedFlag:this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      OptInstockPrereportComponent,
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
      companyMap: this.companyMap
    };
    this.bsModalRef = this.modalService.show(
      ViewLeaseInsertPrereportComponent,
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
