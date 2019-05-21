import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { OptOutPrereportService } from '../../../../../service/opt-out-prereport.service';

@Component({
  selector: 'app-opt-outstock-prereport',
  templateUrl: './opt-outstock-prereport.component.html',
  styleUrls: ['./opt-outstock-prereport.component.css']
})
export class OptOutstockPrereportComponent implements OnInit {
  isVisible = false;
  list: any;
  index: any = 1;
  paramsObj: any;
  settlementList: any[] = [];
  deliverTypeList: any;
  locationList: any[] = [];
  standardList: any;
  cargoList: any[] = [];//全部商品列表
  reportCargo: any[] = [];//预报出库列表
  goodList: any[] = [];//实际出库列表
  miscellaneousList: any[] = [];//杂项列表
  outboundGoodsList: any[] = []; //出库货物列表
  stateMap: any = new Map<string, string>();
  warehouseMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  cargoMap: any = new Map<string, string>();
  standardMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();
  deliverTypeMap: any = new Map<string, string>();
  settlementMap: any = new Map<string, string>();
  locationMap: any = new Map<string, string>();
  settlement: any = null;
  sundryAmount: any = 0;//
  storageAmount: any = 0;
  totalAmount: any = 0;
  selectOutbound: any = null;//已选择的货物
  loadedFlag: any;
  loadedFlag1: boolean = false;
  constructor(public bsModalRef: BsModalRef, public bsModalRef1: BsModalRef, private modalService: BsModalService,
    private http: HttpService, public optPrereportService: OptOutPrereportService, private message: NzMessageService, public publicService: PublicService) { }

  ngOnInit() {
    console.log(this.loadedFlag);
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
    console.log(this.paramsObj);
    //获取此仓库的库位
    this.publicService.getLocationId(this.list.warehouseId, (datas, maps) => {
      this.locationList = datas;
      this.locationMap = maps;
      this.getReportCargo();
    });
  }
  getReportCargo() {
    let outstorageId = this.list.outstorageId == null ? "" : this.list.outstorageId;
    //获取预报出库清单
    this.http.post('/ApolloManagement/prereportOut/getReportCargo', { orderId: this.list.id, outstorageId: outstorageId }, res => {
      this.reportCargo = res.data.reportCargo;//预报出库清单
      for (let i = 0; i < this.reportCargo.length; i++) {
        this.reportCargo[i].maxNums = this.reportCargo[i].quantity;//初始化出库最大数量为预报数量+数量
        this.reportCargo[i].staticMaxNum = this.reportCargo[i].cargoIn.preQuantity + this.reportCargo[i].quantity;//用于对比的静态最大数量
        this.reportCargo[i].isError = false;
      }
      this.goodList = JSON.parse(JSON.stringify(this.reportCargo));
      this.calc();//计算价格
      this.loadedFlag1 = true;
      console.log(this.goodList);
    }, 'www');
  }
  //获取当前日期与创建日期的天数差
  getDays(beginDate) {
    var date = beginDate.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var sDate1 = new Date(date).getTime();
    var sDate2 = (new Date()).getTime();//当前时间
    // console.log(sDate1, sDate2);
    var days = Math.floor((sDate2 - sDate1) / (1 * 24 * 60 * 60 * 1000));
    return days;
  }
  //添加预报商品至入库商品列表
  addPrereportGood(item) {
    //判断是否存在此项
    console.log(item.id);
    let flag = true;
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].cargoIn.id == item.cargoIn.id) {
        flag = false;
      }
    }
    if (flag) {
      this.goodList.push(JSON.parse(JSON.stringify(item)));
      this.calc();
    } else {
      this.message.warning('该项已添加至实际出库货物列表');
    }
  }
  //点击删除一项货物
  deletePrereportGood(item) {
    console.log(item.cargoIn.id);
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].cargoIn.id == item.cargoIn.id) {
        this.goodList.splice(i, 1);
      }
    }
    this.calc();
  }
  //选择预报出库货物
  selectOutboundGoods(val) {
    console.log('货物id', val);
    //查询该货物
    if (val == null) { return; }
    console.log(this.locationMap);
    console.log(this.warehouseMap);
    var data = {
      "cargoId": val,
      "companyId": this.warehouseMap.get(this.paramsObj.warehouseId).company_id,
      "tenantId": this.paramsObj.companyId,
      "warehouseId": this.paramsObj.warehouseId
    };
    console.log(data);
    this.http.post('/ApolloManagement/cargoInStorage/getTenantCargo', data, res => {
      this.outboundGoodsList = res.data;
    }, 'www')
  }
  //点击添加到出库表
  addOutbound(item: any) {
    console.log(item);
    let flag = true;
    //判断goodlList总是否已存在该批次的货物
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].cargoIn.id == item.id) { flag = false }
    }
    if (flag) {
      this.goodList.push({
        // id: item.id,
        maxNums: item.preQuantity,
        staticMaxNum: item.preQuantity,
        isError: false,
        cargoIn: {
          id: item.id,
          preQuantity: item.preQuantity,
          extantQuantity: item.extantQuantity,
          cargoId: item.cargoId,
          locationId: item.locationId,
          produceDate: item.produceDate,
          freeNumber: item.freeNumber,
          createTime: item.createTime,
          price: item.price,
          priceUnitId: item.priceUnitId,
          companyId: item.companyId
        }
      })
      this.calc();
    } else {
      this.message.warning('该货物已添加至出库货物列表');
    }
  }
  //点击添加一个杂项
  addNewMiscellaneous() {
    var lists = {
      id: this.index,
      miscellaneousName: null,//杂项名称
      miscellaneousUnit: null,//单位
      miscellaneousNums: 0,//数量
      miscellaneousUnitPrice: 0,//单价
      singleTotalPrice: 0,//单项总价
      isError1: false,
      isError2: false
    };
    this.miscellaneousList.push(lists);
    this.index++;
    this.calc();
  }
  //点击删除一个杂项
  deleteMiscellaneous(id) {
    for (let i = 0; i < this.miscellaneousList.length; i++) {
      if (this.miscellaneousList[i].id == id) {
        this.miscellaneousList.splice(i, 1);
      }
    }
    this.calc();
  }
  //校验出库货物数量格式
  checkNum(val, maxNum, index) {
    console.log(val, maxNum);
    let reg = /^[1-9]\d*$/;//正整数正则
    if (val > maxNum) {
      console.log(index);
      this.message.warning(`货物数量已超出最大值${maxNum}`);
    }
    if (!reg.test(val)) {
      this.message.warning(`出库数量错误`);
    }
    if ((val > maxNum) || !reg.test(val)) {
      this.goodList[index].isError = true;
    } else {
      this.goodList[index].isError = false;
      this.calc();
    }
  }
  //验证杂项数量，金额
  calculateOthers(e, i, type) {
    console.log(e, type);
    if (type == 'numbers') {
      let reg = /^[1-9]\d*$/;//正整数正则
      if (!reg.test(e)) {
        this.message.warning('杂项数量格式错误');
        this.miscellaneousList[i].isError1 = true;
      } else {
        this.miscellaneousList[i].isError1 = false;
      }
    }
    if (type == 'price') {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;//金额数正则
      if (!reg.test(e)) {
        this.message.warning('杂项金额格式错误');
        this.miscellaneousList[i].isError2 = true;
      } else {
        this.miscellaneousList[i].isError2 = false;
      }
    }
    //格式正确进行计算
    if (this.miscellaneousList[i].isError1 == false && this.miscellaneousList[i].isError2 == false) {
      console.log('计算');
      this.calc();
    }
  }
  calc() {
    let sum1: number = 0;//总存储费用
    let sum2 = 0;//总杂项费用
    for (let i = 0; i < this.goodList.length; i++) {
      let sums: number = (this.getDays(this.goodList[i].cargoIn.createTime) - this.goodList[i].cargoIn.freeNumber) > 0 ? (this.getDays(this.goodList[i].cargoIn.createTime) - this.goodList[i].cargoIn.freeNumber) * this.goodList[i].cargoIn.price * this.goodList[i].maxNums : 0
      sum1 += sums;
    }
    for (let i = 0; i < this.miscellaneousList.length; i++) {
      this.miscellaneousList[i].singleTotalPrice = this.miscellaneousList[i].miscellaneousNums * this.miscellaneousList[i].miscellaneousUnitPrice;
      sum2 += this.miscellaneousList[i].miscellaneousNums * this.miscellaneousList[i].miscellaneousUnitPrice;
    }
    this.storageAmount = sum1;
    this.sundryAmount = sum2;
    this.totalAmount = sum1 + sum2;
  }
  handle() {
    console.log(this.paramsObj);
    console.log(this.goodList);
    console.log(this.miscellaneousList);
    // return;
    if (sessionStorage.getItem('user') == null) { return }
    let cargoList = [];
    let feeList = [];
    var tenantId = this.paramsObj.tenantId;
    if (this.settlement == null) { this.message.warning('请选择结算方式'); return }
    if (this.paramsObj.deliveryName == '') { this.message.warning('请输入收货人姓名'); return }
    if (this.paramsObj.deliveryPhone == '') { this.message.warning('请输入收货人电话'); return }
    if (this.paramsObj.receiveAddress == '') { this.message.warning('请输入收货地址'); return }
    if (this.paramsObj.deliveryType == 1) {//自提时
      // if (this.paramsObj.deliveryCode == '' || this.paramsObj.deliveryCode == null) { this.message.warning('请输入自提码'); return }
      // if (this.paramsObj.deliveryTime == null) { this.message.warning('请选择自提时间'); return }
      if (this.paramsObj.carNumber == '') { this.message.warning('请输入车牌号'); return }
      // if (this.paramsObj.driverPhone == '') { this.message.warning('请输入司机电话'); return }
      // if (this.paramsObj.driverName == '') { this.message.warning('请输入司机名称'); return }
    } else {
      if (this.paramsObj.logisticsId == '') { this.message.warning('请输入物流公司'); return }
    }
    if (this.goodList.length == 0) { this.message.warning('请先添加出库货物'); return }
    let cargoIdFlag = true;
    let feeFlag = true;
    let feeFlag1 = true;
    for (let i = 0; i < this.goodList.length; i++) {
      if ((this.goodList[i].maxNums > this.goodList[i].staticMaxNum) || (this.goodList[i].isError)) {
        cargoIdFlag = false;
      }
    }
    if (!cargoIdFlag) { this.message.warning('出库货物数量存在错误！'); return; }//数量验证不通过不提交
    for (let i = 0; i < this.miscellaneousList.length; i++) {
      if ((this.miscellaneousList[i].isError2) || (this.miscellaneousList[i].isError1)) { feeFlag = false; }
      if (this.miscellaneousList[i].miscellaneousName == null || this.miscellaneousList[i].miscellaneousUnit == null) { feeFlag1 = false }
    }
    if (!feeFlag) { this.message.warning('杂项数量或金额格式存在错误！'); return; }//金额或数量验证不通过不提交
    if (!feeFlag1) { this.message.warning('请完善杂项表单！'); return; }
    //货物
    for (let i = 0; i < this.goodList.length; i++) {
      cargoList.push(
        {
          "custodianFee": document.getElementsByClassName('custodianFee')[i].innerHTML,//单项合计
          "cargoId": this.goodList[i].cargoIn.cargoId,//货物id
          "cargoInstorageId": this.goodList[i].cargoIn.id,
          "companyId": this.goodList[i].cargoIn.companyId,//
          "locationId": this.goodList[i].cargoIn.locationId,//库位id
          "price": this.goodList[i].cargoIn.price,//单价
          "priceUnitId": this.goodList[i].cargoIn.priceUnitId,//单位
          "produceDate": this.goodList[i].cargoIn.produceDate,//过期日期
          "quantity": this.goodList[i].maxNums,//数量
          "tenantId": tenantId,//租户id
          "warehouseId": this.paramsObj.warehouseId,//仓库id
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
          "measPrice": this.miscellaneousList[j].miscellaneousUnitPrice,//金额
        }
      );
    }
    var data =
    {
      "cargoList": cargoList,
      "feeList": feeList,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "descrption": this.paramsObj.descrption,
      "driverName": this.paramsObj.driverName,//司机id
      "driverPhone": this.paramsObj.driverPhone,
      "deliveryAddress": this.paramsObj.receiveAddress,
      "type": this.paramsObj.deliveryType,
      "deliveryCode": this.paramsObj.deliveryCode,
      "deliveryName": this.paramsObj.deliveryName,
      "deliveryPhone": this.paramsObj.deliveryPhone,
      "logisticsId": this.paramsObj.logisticsId,//物流公司
      "operatorId": JSON.parse(sessionStorage.getItem('user')).id,//操作员
      "preReportId": this.paramsObj.id,//预报单id
      "preReportNumber": this.paramsObj.preReportNumber,//预报单号
      "tenantId": tenantId,//租户id
      "variablePaymentId": this.settlement == null ? '' : this.settlement,//支付方式
      "warehouseId": this.paramsObj.warehouseId,//仓库id
      "otherAmount": this.sundryAmount,//杂项金额
      "totalAmount": this.totalAmount,//合计金额
      "storageAmount": this.storageAmount,//存储金额
      "state": this.paramsObj.deliveryType == 1 ? 2 : 1
    };
    console.log(data);
    this.http.post('/ApolloManagement/outStorage/cargoOutStorage', data, res => {
      console.log(res);
      if (res.meta.success == true) {
        this.message.warning('出库登记成功！');
        this.optPrereportService.searchPrereport();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
  previewVisible: boolean = false;
  cargoImageUrl: string = '';
  //预览商品图片
  preview(url) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
}
