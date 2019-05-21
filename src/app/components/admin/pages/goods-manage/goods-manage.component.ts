import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { GoodsService } from '../../../../service/goods.service';
import { PublicService } from '../../../../service/public.service';
import { Load } from '../../../../service/load';
import { NzMessageService } from 'ng-zorro-antd';
import { AddGoodsComponent } from '../goods-manage/add-goods/add-goods.component';
import { EditGoodsComponent } from '../goods-manage/edit-goods/edit-goods.component';
// import { saveAs } from "file-saver";
import ExportJsonExcel from 'js-export-excel';
@Component({
  selector: 'app-goods-manage',
  templateUrl: './goods-manage.component.html',
  styleUrls: ['./goods-manage.component.css'],
  providers: [BsModalRef]
})
export class GoodsManageComponent implements OnInit {
  idx: any;
  allGoodsList: any[] = [];
  goodsTypeList: any[] = [];//货物类别列表
  originPlaceList: any[] = [];//产地列表
  priceUnitList: any[] = [];//计量单位列表
  productionList: any[] = [];//厂家列表
  agentList: any[] = [];//代理商列表

  goodsTypeMap: any = new Map<string, string>();
  originPlaceMap: any = new Map<string, string>();
  unitsMap: any = new Map();
  productionMap: any = new Map<string, string>();
  agentMap: any = new Map<string, string>();

  goodsNumber: any = '';//货物编号
  goodsName: any = '';//货物名称
  goodsType: any = '';//货物类别
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public bsModalRef1: BsModalRef,
    public goodsService: GoodsService,
    private msg: NzMessageService,
    public publicService: PublicService,
    public load:Load
  ) { }
  ngOnInit() {
    this.load.loading6 = true;
    //获取货物类型
    this.publicService.getGoodsTypeList((data, map) => {
      this.goodsTypeList = data;
      this.goodsTypeMap = map;
      //获取产地
      this.publicService.getOriginPlaceList((data, map) => {
        this.originPlaceList = data;
        this.originPlaceMap = map;
        //获取厂家
        this.publicService.getProductionList((data, map) => {
          this.productionList = data;
          this.productionMap = map;
          //获取代理商
          this.publicService.getAgentList((data, map) => {
            this.agentList = data;
            this.agentMap = map;
            //获取计量单位
            this.publicService.getStandard((data, map) => {
              this.priceUnitList = data;
              this.unitsMap = map;
              this.goodsService.searchGoods();
            });
          });
        });
      });
    });
  }
  previewVisible: boolean = false;
  cargoImageUrl: any = '';
  //预览
  preView(url: string) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  //打印
  printTable() {
    // window.print();
    var printHtml = document.getElementById("printTable").innerHTML;
    var wind = window.open("", 'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
    wind.document.body.innerHTML = printHtml;
    wind.print();
  }
  //导出
  exportTable() {
    // const blob = new Blob([document.getElementById('exportableTable').innerHTML], {
    //   // type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    //   type: "application/vnd.ms-excel"
    // });
    // saveAs(blob, 'test.xls');
    const data = this.goodsService.allGoodsList.length != 0 ? this.goodsService.allGoodsList : '';//表格数据
    var option: any = {};
    let dataTable = [];
    if (data) {
      for (let i in data) {
        if (data) {
          let obj = {
            '英文名': data[i].cargoNumber,
            '中文名': data[i].cargoName,
          }
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '货物信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['英文名', '中文名'],
        sheetHeader: ['英文名', '中文名']
      }
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }
  addGoods() {
    const initialState = {
      goodsTypeList: this.goodsTypeList,
      originPlaceList: this.originPlaceList,
      productionList: this.productionList,
      priceUnitList: this.priceUnitList,
      agentList: this.agentList
    };
    this.bsModalRef = this.modalService.show(
      AddGoodsComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
  searchGoods() {
    this.goodsService.searchGoods();
  }
  editGoods(obj: any) {
    const initialState = {
      list: obj,
      goodsTypeList: this.goodsTypeList,
      originPlaceList: this.originPlaceList,
      priceUnitList: this.priceUnitList,
      productionList: this.productionList,
      agentList: this.agentList
    };
    this.bsModalRef = this.modalService.show(
      EditGoodsComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-lg' })
    );
  }
  //确认删除
  deleteGoods(id): void {
    this.http.get('/ApolloManagement/cargo/deleteCargo', { id: id }, res => {
      this.msg.success('删除成功!');
      this.goodsService.searchGoods();
    });
  }
}
