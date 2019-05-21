import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LeaseOutPrereportService } from '../../../../../service/lease-out-prereport.service';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-add-lease-out-prereport',
  templateUrl: './add-lease-out-prereport.component.html',
  styleUrls: ['./add-lease-out-prereport.component.css']
})
export class AddLeaseOutPrereportComponent implements OnInit {
  isVisible: boolean = false;//
  stockList: any;
  cargoList: any;

  forcastTime: any = null;
  stockName: any = null;
  companyName: any = '';
  driverName: any = '';
  driverPhone: any = '';
  deliverName: any = '';
  deliverPhone: any = '';
  receiveAddress: any = '';
  carNumber: any = "";
  CntrNo: any = '';//柜号
  batch: any = '';//批次
  idcard: any = '';
  carNum: any = '';
  logistics: any = '';
  description: any = '';
  deliveryType: any = 2;//默认代提
  deliverTypeList: any;
  deliveryCode: any = '';//自提码
  deliveryTime: any = null;//自提时间
  goodList: any[] = [];
  outboundGoodsList: any[] = [];
  warehouseMap: any;
  locationMap: any;
  cargoMap: any;
  standardMap: any;
  priceUnitMap: any;
  totalPrice: any = 0;//财务过审总价
  selectOutbound: any = null;
  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };
  loadedFlag: any;
  previewVisible: boolean = false;
  cargoImageUrl: any = '';
  //预览
  preView(url: string) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  constructor(
    private http: HttpService,
    public bsModalRef: BsModalRef,
    public bsModalRef1: BsModalRef,
    private message: NzMessageService,
    public modalService: BsModalService,
    public publicService: PublicService,
    public leasePrereportService: LeaseOutPrereportService
  ) { }
  ngOnInit() {
    console.log(this.loadedFlag);
  }
  addNewGood() {
    console.log(this.stockName);
    if (this.stockName == null) { this.message.warning('请选择仓库'); return; }
    this.isVisible = true;
  }
  //打开选择预报出库模态框时重新搜索
  nzAfterOpen() {
    console.log(this.selectOutbound);
    this.selectOutboundGoods(this.selectOutbound);
  }
  handleOk(): void {
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  //选择提货方式
  changeDeliveryType(e) {
    console.log(e);
    this.deliveryCode = '';
    this.deliveryTime = null;
  }
  //选择仓库
  selectStock(val) {
    console.log(val);
    console.log(this.warehouseMap.get(val));
    this.goodList = [];
    if (val == null) { return; }
    this.publicService.getLocationId(val, (datas, maps) => {
      this.locationMap = maps;
    })
  }
  //选择预报出库货物
  selectOutboundGoods(val) {
    let companyId = JSON.parse(sessionStorage.getItem('user')).companyId;
    console.log('货物id', val);
    //查询该货物
    console.log(this.stockList);
    if (val == null) { return; }
    var data = {
      "cargoId": val,
      "companyId": this.warehouseMap.get(this.stockName).company_id,
      "tenantId": companyId,
      "warehouseId": this.warehouseMap.get(this.stockName).id
    };
    this.http.post('/ApolloManagement/cargoInStorage/preExistNum', data, res => {
      this.outboundGoodsList = res.data;
    }, 'www')
  }
  //点击添加一项预报出库商品
  addOutbound(item) {
    console.log(item);
    console.log(this.cargoMap);
    let flag = false;
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].id == item.id) {
        flag = true;
      }
    }
    if (!flag) {
      item.maxNum = item.num;
      item.isError = false;
      item.isError1 = false;
      item.price = 0;
      this.goodList.push(item);
      console.log(this.goodList);
      this.calc();
    } else {
      this.message.warning('该货物已添加至预报出库列表');
    }
  }
  //点击删除一项预报出库商品
  deleteGood(id) {
    console.log(id);
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].id == id) {
        this.goodList.splice(i, 1);
      }
    }
    this.calc();
  }
  //校验数量格式
  checkNum(val, maxNum, index) {
    console.log(val, maxNum);
    let reg = /^[1-9]\d*$/;
    if (val > maxNum) {
      console.log(index);
      this.message.warning(`货物数量已超出最大值${maxNum}`);
    }
    if (!reg.test(val)) {
      this.message.warning(`货物数量错误`);
    }
    if ((val > maxNum) || !reg.test(val)) {
      this.goodList[index].isError = true;
    } else {
      this.goodList[index].isError = false;
      this.calc();
    }
  }
  //校验价格
  checkPrice(val, index) {
    console.log(val, index);
    if (val < 0) {
      this.goodList[index].isError1 = true;
    } else {
      this.goodList[index].isError1 = false;
      this.calc();
    }
  }
  //计算金额
  calc() {
    let sum = 0;
    for (let i = 0; i < this.goodList.length; i++) {
      sum += this.goodList[i].num * this.goodList[i].price;
    }
    this.totalPrice = sum;
  }
  //提交
  handle() {
    if (this.forcastTime == null) { this.message.warning('请输入预报时间'); return; }
    let start = this.http.transDate(this.forcastTime[0]);
    let end = this.http.transDate(this.forcastTime[1]);
    if (this.stockName == null) { this.message.warning('请选择仓库'); return; }
    if (this.deliverName == '') { this.message.warning('请输入收货人姓名'); return; }
    if (this.deliverPhone == '') { this.message.warning('请输入收货人电话'); return; }
    if (this.receiveAddress == '') { this.message.warning('请输入收货地址'); return; }
    if (this.deliveryType == 1) {
      if (this.deliveryCode == '') { this.message.warning('请输入自提码'); return; }
      if (this.deliveryTime == null) { this.message.warning('请输入自提时间'); return; }
    }
    if (this.carNumber == '' && this.deliveryType == 1) { this.message.warning('请输入车牌号'); return; }
    if (this.goodList.length == 0) { this.message.warning('请添加预报出库货物'); return; }
    let cargoIdFlag = true;
    for (let i = 0; i < this.goodList.length; i++) {
      if ((this.goodList[i].num > this.goodList[i].maxNum) || (this.goodList[i].isError) || (this.goodList[i].isError1)) {
        cargoIdFlag = false;
      }
    }
    if (cargoIdFlag) {
      let reportCargoList: any[] = [];
      console.log('提交预报出库');
      let applicant: any = JSON.parse(sessionStorage.getItem('user'));
      let applicantId = applicant.id;
      let companyId = applicant.companyId;
      let data =
      {
        "beginTime": start,
        "endTime": end,
        "applicantId": applicantId,
        "carNumber": this.carNumber,
        "cargoList": reportCargoList,
        "companyId": companyId,
        "deliveryName": this.deliverName,
        "deliveryPhone": this.deliverPhone,
        "descrption": this.description,
        "driverName": this.driverName,
        "driverPhone": this.driverPhone,
        // "id": 0,
        "logisticsId": this.logistics,
        // "logisticsImg": "",//物流单
        "orderType": 1,
        "deliveryType": this.deliveryType,//自提（1）或代提（2）
        "deliveryCode": this.deliveryCode,//自提码
        "deliveryTime": this.deliveryTime == null ? "" : this.http.transDate(this.deliveryTime),//自提时间
        // "outstorageId": 0,
        // "preReportNumber": "string",
        "receiveAddress": this.receiveAddress,
        // "reviewerId": 0,
        "state": applicant.type == 1 ? 1 : 2,
        "tenantId": companyId,
        "warehouseId": this.stockName
      }
      for (let i = 0; i < this.goodList.length; i++) {
        reportCargoList.push(
          {
            "cargoInId": this.goodList[i].id,
            "companyId": this.goodList[i].companyId,
            "outOrderType": 1,
            "price": this.goodList[i].price,
            "priceUnitId": this.cargoMap.get(this.goodList[i].cargoId).measUnitId,
            "produceDate": this.goodList[i].produceDate,
            "quantity": this.goodList[i].num,
            "tenantId": companyId,//
            "warehouseId": this.goodList[i].warehouseId
          }
        );
      }
      console.log(data);
      this.http.post('/ApolloManagement/prereportOut/insert', data, res => {
        console.log(res.data);
        this.message.success(`添加预报出库成功！`);
        this.leasePrereportService.search();
        this.bsModalRef.hide();
      }, 'json')
    } else {
      this.message.warning(`数量或金额存在错误，请检查后提交！`);
    }
  }
}
