import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LeaseInsertPrereportService } from '../../../../../service/lease-insert-prereport.service';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-add-lease-insert-prereport',
  templateUrl: './add-lease-insert-prereport.component.html',
  styleUrls: ['./add-lease-insert-prereport.component.css']
})
export class AddLeaseInsertPrereportComponent implements OnInit {
  selectedValue = null;
  hiddenFlag: boolean = true;
  companyName: any = '';
  forcastTime: any = null;
  iostock: any = 1;
  stockName: any = '';
  driverName: any = '';
  driverTel: any = '';
  deliverName: any = '';
  deliverPhone: any = '';
  carNumber: any = "";
  CntrNo: any = '';//柜号
  batch: any = '';//批次
  sex: any = '';
  idcard: any = '';
  carNum: any = '';
  logisticsCompany: any = '';
  receiveAddress: any = '';
  description: any = '';
  goodList: any[] = [];
  cargolist: any[] = [];//货品下拉菜单
  stockList: any[];//仓库下拉菜单
  companyId: any = '';//仓库对应的公司id
  standardList: any[] = [];//包装规格单位数组
  perAccountList: any[] = [];//计价方式
  standardMap: any = new Map<string, string>();
  perAccountMap: any = new Map<string, string>();
  index: any = 1;
  selectedArr: any[] = [];//已选择数组
  flag: boolean;
  loadedFlag: boolean = false;//数据加载完毕
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public publicService: PublicService,
    private message: NzMessageService, public leasePrereportService: LeaseInsertPrereportService) { }
  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };
  ngOnInit() {
    this.publicService.getStandard((data, map) => {
      this.standardList = data;
      this.standardMap = map;
      this.publicService.getPriceUnit((data, map) => {
        this.perAccountList = data;
        this.perAccountMap = map;
        this.publicService.getCargoList((data, map) => {
          this.cargolist = data;
          for (let i = 0; i < this.cargolist.length; i++) {
            this.cargolist[i].checked = false;
          }
          this.loadedFlag = true;
        });
      });
    });
  }
  addNewGood() {
    if (this.iostock != '') {
      if (this.companyId != '') {
        //入库
        if (this.iostock == 1) {
          this.flag = true;
          //出库
        } else if (this.iostock == 2) {
          this.flag = false;
        }
        var lists = {
          id: this.index,
          cargoId: '',
          cargoNumber: '',
          goodStandard: '',
          cargoImageUrl: '',
          quantity: '',
          goodBulk: 0,
          goodWeight: 0,
          priceUnit: '',
          checked: false,
          maxNum: 0,
          boxBarCode: '',
          packageBarCode: '',
          expireTime: null
        };
        this.goodList.push(lists);
        this.index++;
      } else {
        this.message.create('warning', '请选择仓库后再添加');
      }
    } else {
      this.message.create('warning', '请选择出入库方式');
    }
  }
  deleteGood(id) {
    for (let i = 0; i < this.goodList.length; i++) {
      if (this.goodList[i].id == id) {
        //出库状态时，删除此项时此项恢复可选
        if (this.flag == false) {
          for (let j = 0; j < this.cargolist.length; j++) {
            if (this.cargolist[j].id == this.goodList[i].cargoId) {
              this.cargolist[j].checked = false;
            }
          }
        }
        this.goodList.splice(i, 1);
      }
    }
  }
  //货物名称与货物规格联动
  selectType(id: number, val: number) {
    console.log(id, val);
    for (let i = 0; i < this.goodList.length; i++) {
      if (id == this.goodList[i].id) {
        for (let j = 0; j < this.cargolist.length; j++) {
          if (this.cargolist[j].id == val) {
            //出库时每次只选一件
            if (this.flag == false) {
              this.goodList[i].checked = true;
              this.cargolist[j].checked = true;
              //获取货物最大数量
              this.getCargoSum(this.cargolist[j].id, i);
            }
            console.log(this.cargolist[j]);
            this.goodList[i].goodStandard = this.cargolist[j].measUnitId;//选择的货物的规格
            this.goodList[i].priceUnit = this.cargolist[j].measUnitId;//计价方式
            this.goodList[i].goodBulk = this.cargolist[j].volume;
            this.goodList[i].goodWeight = this.cargolist[j].weight;
            this.goodList[i].boxBarCode = this.cargolist[j].boxBarCode;
            this.goodList[i].packageBarCode = this.cargolist[j].packageBarCode;
            this.goodList[i].cargoImageUrl = this.cargolist[j].cargoImageUrl;
            this.goodList[i].cargoNumber = this.cargolist[j].cargoNumber;
          }
        }
      }
    }
  }
  //获取货物最大数量
  getCargoSum(cargoId, index) {
    var data = {
      "cargoId": cargoId,
      "companyId": this.companyId,
      "warehouseId": this.stockName,
      "tenantId": JSON.parse(sessionStorage.getItem('user')).companyId
    };
    console.log(data);
    this.http.post('/ApolloManagement/wmsApi/order/preoutlound/localCargoSum', data, res => {
      if (res.meta.success == true) {
        console.log('最大出库数量', res.data.num);
        this.goodList[index].maxNum = res.data.num;
      }
    }, 'json');
  }
  //选择仓库
  selectStock(val) {
    console.log(val);
    var flag = false;
    //遍历到该仓库对应的公司
    for (let i = 0; i < this.stockList.length; i++) {
      if (this.stockList[i].id == val) {
        this.companyId = this.stockList[i].company_id;
        flag = true;
      }
    }
    if (!flag) {
      this.companyId = "";
    }
  }
  //添加预报入库
  addWareHouse() {
    console.log(this.goodList);
    if (sessionStorage.getItem('user')) {
      let applicant: any = JSON.parse(sessionStorage.getItem('user'));
      let applicantId = applicant.id;
      let companyId = applicant.companyId;
      let reportCargoList: any[] = [];
      let cargoIdFlag = true;
      let quantityFlag = true;
      let expireTimeFlag = true;
      if (this.forcastTime == null) { this.message.warning('请输入预报时间'); return; }
      let start = this.http.transDate(this.forcastTime[0]);
      let end = this.http.transDate(this.forcastTime[1]);
      if (this.stockName == '') { this.message.warning('请选择仓库'); return; }
      if (this.carNumber == '') { this.message.warning('请输入车牌号'); return; }
      if (this.driverName == '') { this.message.warning('请输入司机名称'); return; }
      if (this.driverTel == '') { this.message.warning('请输入司机电话'); return; }
      if (this.goodList.length == 0) { this.message.warning('请添加货物清单'); return; }
      for (let i = 0; i < this.goodList.length; i++) {
        if (this.goodList[i].cargoId == '') {
          cargoIdFlag = false;
        }
        if (this.goodList[i].expireTime == null) {
          expireTimeFlag = false;
        }
        if (this.goodList[i].quantity == '' || this.goodList[i].quantity <= 0) {
          quantityFlag = false;
        }
      }
      if (cargoIdFlag == false) { this.message.warning('请选择货物'); return; }
      if (quantityFlag == false) { this.message.warning('请输入正确的货物数量'); return; }
      if (expireTimeFlag == false) { this.message.warning('请输入过期时间'); return; }
      for (let i = 0; i < this.goodList.length; i++) {
        reportCargoList.push(
          {
            "cargoId": this.goodList[i].cargoId,
            "companyId": this.companyId,
            "priceUnitId": this.goodList[i].priceUnit,
            "quantity": this.goodList[i].quantity,
            "tenantId": companyId,
            "warehouseId": this.stockName,
            "produceDate": this.http.transDate(this.goodList[i].expireTime),
            // "preReportId": 0,
          }
        );
      }
      let data =
      {
        "applicantId": applicantId,
        "beginTime": start,
        "endTime": end,
        "companyId": this.companyId,
        "descrption": this.description,
        "driverName": this.driverName,
        "driverPhone": this.driverTel,
        "carNumber": this.carNumber,
        "logistics": this.logisticsCompany,
        "deliveryName": this.deliverName,
        "deliveryPhone": this.deliverPhone,
        "receiveAddress": this.receiveAddress,
        "cargoList": reportCargoList,
        "tenantId": companyId,
        "warehouseId": this.stockName,
        // "deliveryTime": "",
        "logisticsImg": "",
        "cntrNo": this.CntrNo,
        "batch": this.batch
      }
      console.log(data);
      this.http.post('/ApolloManagement/prereportIn/insert', data, res => {
        if (res.meta.success == true) {
          this.message.success('添加成功！');
          this.leasePrereportService.search();
          this.bsModalRef.hide();
        }
      }, 'json');
    }
  }
  cargoImageUrl: string = '';
  previewVisible: boolean = false;
  preView(url) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
}
