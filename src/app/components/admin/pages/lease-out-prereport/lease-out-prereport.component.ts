import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { PublicService } from '../../../../service/public.service';
import { Load } from '../../../../service/load';
import { NzMessageService } from 'ng-zorro-antd';
import { LeaseOutPrereportService } from '../../../../service/lease-out-prereport.service';
import { AddLeaseOutPrereportComponent } from '../lease-out-prereport/add-lease-out-prereport/add-lease-out-prereport.component';
import { ViewLeaseOutPrereportComponent } from '../lease-out-prereport/view-lease-out-prereport/view-lease-out-prereport.component';

@Component({
  selector: 'app-lease-out-prereport',
  templateUrl: './lease-out-prereport.component.html',
  styleUrls: ['./lease-out-prereport.component.css'],
  providers: [BsModalRef]
})
export class LeaseOutPrereportComponent implements OnInit {
  stockList: any[] = [];
  companyList: any[] = [];
  cargoList: any[] = [];
  stateList: any[] = [];
  deliverTypeList: any[] = [];
  operatorMap: any = new Map<string, string>();//操作员map
  stateMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  warehouseMaps: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  standardMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  deliverTypeMap: any = new Map<string, string>();//提货方式
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private message: NzMessageService,
    public publicService: PublicService,
    public leasePrereportService: LeaseOutPrereportService,
    public load:Load
  ) { }

  ngOnInit() {
    this.load.loading9 = true;
    //获取仓库
    this.publicService.getStockList((datas, maps,maps1) => {
      this.stockList = datas;
      this.warehouseMaps = maps;
      this.warehouseMap = maps1;//name
      //获取所有公司
      this.publicService.getAllCompany((datas, maps) => {
        this.companyList = datas;
        this.companyMap = maps;
        //获取运营操作员
        this.publicService.getOperator((datas, maps) => {
          this.operatorMap = maps;
          //获取所有货物
          this.publicService.getCargoList((datas, maps) => {
            this.cargoList = datas;
            this.cargoMap = maps;
            //获取包装规格
            this.publicService.getStandard((datas, maps) => {
              this.standardMap = maps;
              //获取计价单位
              this.publicService.getPriceUnit((datas, maps) => {
                this.priceUnitMap = maps;
                //获取状态
                this.publicService.getStatus((datas, maps) => {
                  this.stateList = datas;
                  this.stateMap = maps;
                  //获取提货方式
                  this.publicService.getDeliverType((datas, maps) => {
                    this.deliverTypeList = datas;
                    this.deliverTypeMap = maps;
                    this.loadedFlag = true;
                    this.search();
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  //点击添加
  add() {
    const initialState = {
      stockList: this.stockList,
      cargoList: this.cargoList,
      cargoMap: this.cargoMap,
      warehouseMap: this.warehouseMaps,
      deliverTypeList: this.deliverTypeList,
      standardMap: this.standardMap,
      priceUnitMap: this.priceUnitMap,
      deliverTypeMap: this.deliverTypeMap,
      loadedFlag: this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      AddLeaseOutPrereportComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-xll' })
    );
  }
  //点击搜索
  search() {
    this.leasePrereportService.search();
  }
  //点击预览
  view(obj: any) {
    const initialState = {
      list: obj,
      stateMap: this.stateMap,
      warehouseMap: this.warehouseMaps,
      companyMap: this.companyMap,
      cargoMap: this.cargoMap,
      standardMap: this.standardMap,
      priceUnitMap: this.priceUnitMap,
      deliverTypeMap: this.deliverTypeMap
    };
    this.bsModalRef = this.modalService.show(
      ViewLeaseOutPrereportComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
  //确认删除
  delete(id): void {
    this.http.post('/ApolloManagement/prereportOut/delete', { id: id }, res => {
      if (res.meta.success == true) {
        this.message.success('删除成功！');
        this.search();
      }
    }, 'www');
  }
  //选择仓库获取仓库对应的公司
  changeStock(val) {
    console.log(val);
    var flag = false;
    //遍历到该仓库对应的公司
    for (let i = 0; i < this.stockList.length; i++) {
      if (this.stockList[i].id == val) {
        this.leasePrereportService.stockCompanyId = this.stockList[i].company_id;
        flag = true;
      }
    }
    if (!flag) {
      this.leasePrereportService.stockCompanyId = "";
    }
  }
}
