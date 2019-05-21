import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { OptInsertPrereportService } from '../../../../../service/opt-insert-prereport.service';
@Component({
  selector: 'app-opt-instock-prereport',
  templateUrl: './opt-instock-prereport.component.html',
  styleUrls: ['./opt-instock-prereport.component.css']
})
export class OptInstockPrereportComponent implements OnInit {
  list: any;
  paramsObj: any;
  nums: any = '';//单号
  settlementList: any[] = [];//结算方式数组
  settlement: any = ''//结算方式
  sundryAmount: any = 0;//杂项金额
  storageAmount: any = 0;//储存金额
  totalAmount: any = 0;//合计金额
  stockList: any[] = [];//所有仓库
  locationList: any[] = [];//库位列表
  warehouseMap: any;//仓库map
  companyMap: any;//所有公司map
  goodList: any[] = [];//货物列表
  miscellaneousList: any[] = [];//杂项列表
  cargolist: any[] = [];//所有货物列表
  measureList: any[] = [];//单位列表
  index: any = 1;
  outboundList: any[] = [];//总出库货物列表
  outboundGoodsList: any[] = [];//不同批次的货物列表
  stateMap: any;
  typeMap: any;
  cargoMap: any;
  locationMap: any = new Map<string, string>();
  settlementMap: any = new Map<string, string>();
  measureMap: any = new Map<string, string>();
  standardMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  selectOutbound: any = '';
  cargoLists: any[] = [];
  instorageCargoList: any[] = [];
  loadedFlag: any;
  constructor(public bsModalRef: BsModalRef, public bsModalRef1: BsModalRef, private modalService: BsModalService,
    private http: HttpService, public optPrereportService: OptInsertPrereportService, private message: NzMessageService, public publicService: PublicService) { }

  ngOnInit() {
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
    //获取仓库的库位
    this.publicService.getLocationId(this.list.warehouseId, (datas, maps) => {
      this.locationList = datas;
      this.locationMap = maps;
      this.getWareHouseList();
    });
  }
  previewVisible: boolean = false;
  cargoImageUrl: any = '';
  //预览
  preView(url: string) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  // //根据orderId获取货物清单
  getWareHouseList() {
    let id = this.list.id;
    let instorageId = this.list.instorageId == null ? "" : this.list.instorageId;
    this.http.post('/ApolloManagement/prereportIn/getReportCargo', { orderId: id, instorageId: instorageId }, res => {
      if (res.meta.success == true) {
        this.cargoLists = res.data.reportCargo;
        this.instorageCargoList = res.data.instorageCargo == null ? [] : res.data.instorageCargo;
      }
    }, 'www');
  }
  //选择入库货物
  selectOutboundGoods(val) {
    console.log(val);
    if (val != null) {
      //获取此货物的出库表
      this.http.post('/ApolloManagement/cargoIn/getCargoInbound', { cargoId: val, companyId: JSON.parse(sessionStorage.getItem('user')).companyId, tenatId: this.list.tenantId, warehouseId: this.list.warehouseId }, res => {
        if (res.meta.success == true) {
          this.outboundGoodsList = res.data;
        }
      }, 'www');
    }
  }
  //点击添加到出库表
  addOutbound(item: any) {
    let flag = true;
    //判断goodlList总是否已存在该批次的货物
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].id == item.id) { flag = false }
    }
    if (flag) {
      item.realTime = this.getDays(item.createTime);
      item.nums = 0;
      this.goodList.push(item);
      // console.log(this.goodList);
    } else {
      this.message.warning('该货物已添加至出库货物列表');
    }
  }
  //获取当前日期与创建日期的天数差
  getDays(beginDate) {
    var date = beginDate.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var sDate1 = new Date(date).getTime();
    var sDate2 = (new Date()).getTime();//当前时间
    console.log(sDate1, sDate2);
    var days = Math.floor((sDate2 - sDate1) / (1 * 24 * 60 * 60 * 1000));
    return days;
  }
  //选择货物名称获取货物编号
  selectNum(id, val) {
    console.log('选择货物名称获取货物编号', id, val);
    for (let i = 0; i < this.goodList.length; i++) {
      if (id == this.goodList[i].id) {
        for (let j = 0; j < this.cargolist.length; j++) {
          if (this.cargolist[j].id == parseInt(val)) {
            this.goodList[i].cargoNum = this.cargolist[j].cargoNumber;//选择的货物的编号
            this.goodList[i].splitNumber = this.cargolist[j].splitNumber;
            this.goodList[i].cargoImageUrl = this.cargolist[j].cargoImageUrl;
            this.goodList[i].unitMeasurement = this.cargolist[j].measUnitId;
            console.log(this.cargolist[j]);
          }
        }
      }
    }
  }
  //添加预报商品至入库商品列表
  addPrereportGood(item) {
    console.log(item);
    this.goodList.push({
      id: this.index,
      cargoId: item.cargoId,
      cargoNum: this.cargoMap.get(item.cargoId).cargoNumber,
      intoStockNum: '',
      warehouseLocationNumber: '',
      expireDate: item.produceDate,
      unitMeasurement: item.priceUnitId,
      unitPrice: '',
      nums: item.quantity,
      splitNumber: '',
      freeNumber: ''
    })
    this.selectNum(this.index, item.cargoId);
    this.index++;
  }
  //点击添加一个货物
  addNewGood() {
    var lists = {
      id: this.index,
      cargoId: '',
      cargoNum: '',
      cargoImageUrl: '',
      intoStockNum: '',
      warehouseLocationNumber: '',
      expireDate: '',
      unitMeasurement: '',
      unitPrice: '',
      nums: '',
      splitNumber: '',
      freeNumber: ''
    };
    this.goodList.push(lists);
    this.index++;
  }
  //点击删除一个货物
  deleteGood(id) {
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].id == id) {
        this.goodList.splice(i, 1);
      }
    }
  }
  //点击添加一个杂项
  addNewMiscellaneous() {
    var lists = {
      id: this.index,
      miscellaneousName: '',//杂项名称
      miscellaneousUnit: '',//单位
      miscellaneousNums: 0,//数量
      miscellaneousUnitPrice: 0,//单价
      singleTotalPrice: 0//单项总价
    };
    this.miscellaneousList.push(lists);
    this.index++;
  }
  //点击删除一个杂项
  deleteMiscellaneous(id) {
    var sum = 0;
    for (let i = 0; i < this.miscellaneousList.length; i++) {
      if (this.miscellaneousList[i].id == id) {
        this.miscellaneousList.splice(i, 1);
      } else {
        sum += this.miscellaneousList[i].miscellaneousNums * this.miscellaneousList[i].miscellaneousUnitPrice;
      }
    }
    this.sundryAmount = sum;//杂项总价
  }
  //change事件监听计算价格总和
  calculateOthers() {
    //正则判断(价格正数，数量正整数)
    if (true && true) {
      //计算总和
      var sum = 0;
      for (let i = 0; i < this.miscellaneousList.length; i++) {
        sum += this.miscellaneousList[i].miscellaneousNums * this.miscellaneousList[i].miscellaneousUnitPrice;
      }
      this.sundryAmount = sum;//杂项总价
      this.totalAmount = sum;//合计
    }
  }
  //验证出库数量不超过最大值
  checkNumbers() {
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].extantQuantity < this.goodList[i].nums) {
        return i;
      }
    }
    return false;
  }
  toAdd() {
    console.log(this.list);
    console.log(this.goodList);
    console.log(this.miscellaneousList);
    // return;
    if (sessionStorage.getItem('user') == null) { return }
    var cargoList = [];
    var feeList = [];
    var warehouseId = this.list.warehouseId;
    var tenantId = this.list.tenantId;
    //入库登记
    if (this.settlement == '') { this.message.warning('请选择结算方式'); return }
    if (this.paramsObj.carNumber == '') { this.message.warning('请输入车牌号'); return }
    if (this.goodList.length == 0) { this.message.warning('请先添加入库货物'); return }
    let flag1 = true;
    let flag2 = true;
    let flag3 = true;
    let flag4 = true;
    let flag5 = true;
    for (let n = 0; n < this.goodList.length; n++) {
      if (this.goodList[n].cargoId == '') { flag1 = false }
      if (this.goodList[n].expireDate == '') { flag2 = false }
      if (this.goodList[n].freeNumber == '' || this.goodList[n].freeNumber < 0) { flag3 = false }
      if (this.goodList[n].unitPrice == '' || this.goodList[n].unitPrice < 0) { flag4 = false }
      if (this.goodList[n].nums == '' || this.goodList[n].nums < 0) { flag5 = false }
    }
    if (!flag1) { this.message.warning('货物名称不能为空'); return }
    if (!flag2) { this.message.warning('过期时间不能为空'); return }
    if (!flag3) { this.message.warning('请输入正确格式的免费存放天数'); return }
    if (!flag4) { this.message.warning('请输入正确格式的存储单价'); return }
    if (!flag5) { this.message.warning('请输入正确格式的入库数量'); return }
    //货物
    for (let i = 0; i < this.goodList.length; i++) {
      var date = new Date(this.goodList[i].expireDate);
      cargoList.push(
        {
          "cargoId": this.goodList[i].cargoId,//货物id
          "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,//当前点击的companyid
          "extantQuantity": this.goodList[i].nums,//现存量
          "preQuantity": this.goodList[i].nums,
          "freeNumber": this.goodList[i].freeNumber,//免费放置天数
          "locationId": this.goodList[i].warehouseLocationNumber,//库位id
          "price": this.goodList[i].unitPrice,//单价
          "priceUnitId": this.goodList[i].unitMeasurement,//单位
          "produceDate": date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),//过期日期
          "quantity": this.goodList[i].nums,//数量
          "splitNumber": this.goodList[i].splitNumber,//最小单位
          "tenantId": tenantId,//租户id
          "warehouseId": warehouseId,//仓库id
        }
      );
    }
    //杂项
    for (let j = 0; j < this.miscellaneousList.length; j++) {
      feeList.push(
        {
          "feeInfoName": this.miscellaneousList[j].miscellaneousName,//杂项名称
          "measId": this.miscellaneousList[j].miscellaneousUnit,//单位id
          "measNumber": this.miscellaneousList[j].miscellaneousNums,//杂项数量
          "measPrice": this.miscellaneousList[j].miscellaneousUnitPrice,//单项总价
        }
      );
    }
    var data =
    {
      "cargoList": cargoList,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "descrption": this.list.descrption,
      "driverName": this.paramsObj.driverName,
      "driverPhone": this.paramsObj.driverPhone,
      "feeList": feeList,
      "logistics": this.paramsObj.logistics,//物流公司
      "operatorId": JSON.parse(sessionStorage.getItem('user')).id,//操作员
      "otherAmount": this.sundryAmount,//杂项金额
      "preReportId": this.list.id,//预报单id
      "preReportNumber": this.list.preReportNumber,//预报单号
      "tenantId": tenantId,//租户id
      "totalAmount": this.totalAmount,//合计金额
      "variablePaymentId": this.settlement,//支付方式
      "warehouseId": this.list.warehouseId,//仓库id
      "batch": this.paramsObj.batch,
      "cntrNo": this.paramsObj.cntrNo,
      "state": 1
    };
    console.log(data);
    this.http.post('/ApolloManagement/inStorage/cargoInStorage', data, res => {
      console.log(res);
      if (res.meta.success == true) {
        this.message.warning('入库登记成功！');
        this.optPrereportService.searchPrereport();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
