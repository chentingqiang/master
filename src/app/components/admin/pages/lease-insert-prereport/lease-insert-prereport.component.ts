import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { PublicService } from '../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LeaseInsertPrereportService } from '../../../../service/lease-insert-prereport.service';
import { AddLeaseInsertPrereportComponent } from '../lease-insert-prereport/add-lease-insert-prereport/add-lease-insert-prereport.component';
import { ViewLeaseInsertPrereportComponent } from '../lease-insert-prereport/view-lease-insert-prereport/view-lease-insert-prereport.component';
@Component({
  selector: 'app-lease-insert-prereport',
  templateUrl: './lease-insert-prereport.component.html',
  styleUrls: ['./lease-insert-prereport.component.css'],
  providers: [BsModalRef]
})
export class LeaseInsertPrereportComponent implements OnInit {

  stockList: any[] = [];
  companyList: any[] = [];
  stateList: any[] = [];
  operatorMap: any = new Map<string, string>();//操作员map
  stateMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private message: NzMessageService,
    public leasePrereportService: LeaseInsertPrereportService,
    public publicService: PublicService,
    public load:Load
  ) { }

  ngOnInit() {
    this.load.loading8 = true;
    //获取所有公司
    this.publicService.getAllCompany((datas, maps) => {
      this.companyList = datas;
      this.companyMap = maps;
      this.publicService.getOperator((datas, maps) => {
        this.operatorMap = maps;
        this.publicService.getPreStatus((datas, maps) => {
          this.stateList = datas;
          this.stateMap = maps;
          this.publicService.getStockList((datas, maps,maps1) => {
            this.stockList = datas;
            this.warehouseMap = maps1;
            this.search();
          });
        });
      });
    });
  }
  //点击添加
  add() {
    const initialState = {
      stockList: this.stockList,
    };
    this.bsModalRef = this.modalService.show(
      AddLeaseInsertPrereportComponent,
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
      warehouseMap: this.warehouseMap,
      companyMap: this.companyMap
    };
    this.bsModalRef = this.modalService.show(
      ViewLeaseInsertPrereportComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
  //确认删除
  deleted(id): void {
    console.log(id);
    this.http.post('/ApolloManagement/prereportIn/delete', { id: id }, res => {
      if (res.meta.success == true) {
        this.message.success('删除成功！');
        this.search();
      }
    }, 'www');
  }
  //选择仓库获取仓库对应的公司
  changeStock(val) {
    console.log(val);
    if (val == null) { this.leasePrereportService.stockCompanyId = ""; return }
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
    console.log(this.leasePrereportService.stockCompanyId);
  }
}