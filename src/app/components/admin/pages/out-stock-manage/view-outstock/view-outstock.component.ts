import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { OutStockService } from '../../../../../service/out-stock.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-view-outstock',
  templateUrl: './view-outstock.component.html',
  styleUrls: ['./view-outstock.component.css']
})
export class ViewOutstockComponent implements OnInit {
  list: any;
  loadedFlag: any;
  loadedFlag1: boolean = false;
  warehouseMap: any;
  companyMap: any;
  cargoMap: any;
  operatorMap: any;
  deliverTypeMap: any;
  viewList: any = {
    cargoList: []
  };
  driverList: any[] = [];
  driverMap: any = new Map<string, string>();
  locationMap: any = new Map<string, string>();
  priceUnitMap: any = new Map<string, string>();//
  standardMap: any = new Map<string, string>();//
  variablePaymentMap: any = new Map<string, string>();//结算方式map
  constructor(private http: HttpService, public httpClient: HttpClient, public bsModalRef: BsModalRef, private router: Router,
    public publicService: PublicService, public msg: NzMessageService, public outStockService: OutStockService) { }
  previewVisible: boolean = false;
  cargoImageUrl: any = '';
  driverName: any = null;
  telephone: any = '';
  carNumber: any = '';

  logisticsId: any = '';
  logisticsInfo: any = '';
  img: any = null;
  //预览
  preView(url: string) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  ngOnInit() {
    console.log(this.list);
    this.publicService.getLocationId(this.list.warehouseId, (datas, maps) => {
      this.locationMap = maps;
      //获取规格单位
      this.publicService.getStandard((datas, maps) => {
        this.standardMap = maps;
        //获取计价单位
        this.publicService.getPriceUnit((datas, maps) => {
          this.priceUnitMap = maps;
          //获取结算方式
          this.publicService.getVariablePayment((datas, maps) => {
            this.variablePaymentMap = maps;
            //获取司机
            this.publicService.getDrivers((datas, maps) => {
              this.driverList = datas;
              this.driverMap = maps;
              //获取出库详情表
              this.http.post('/ApolloManagement/outStorage/getOutStorageInfo', { id: this.list.id }, res => {
                console.log(res.data);
                this.viewList = res.data;
                this.loadedFlag1 = true;
              }, 'www');
            })
          })
        })
      })
    })
  }
  selectTel(e) {
    console.log(e);
    if (e == null) { return }
    this.telephone = this.driverMap.get(e).telephone;
  }
  //前往查看出库预报
  toPrereport(number) {
    sessionStorage.setItem('optNumber', number);
    this.bsModalRef.hide();
    this.router.navigate(['/admin/opt-outprereport-manage']);
  }
  //发货
  deliver() {
    if (this.driverName == null) { this.msg.warning('请选择司机名称！'); return }
    if (this.telephone == '') { this.msg.warning('请输入司机电话！'); return }
    if (this.carNumber == '') { this.msg.warning('请输入车牌号！'); return }
    let data =
    {
      'driverId': this.driverName,
      "driverName": this.driverMap.get(this.driverName).name,
      "driverPhone": this.driverMap.get(this.driverName).telephone,
      "id": this.list.id,
      "state": 2
      // "preReportId": this.list.preReportId
    };
    console.log(data);
    this.http.post('/ApolloManagement/outStorage/shipCargo', data, res => {
      this.msg.success('发货成功！');
      this.bsModalRef.hide();
      this.outStockService.toSearch();
    }, 'json')
  }
  //上传
  fileList: any = [];
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  // previewImage: string | undefined = '';
  // previewVisible = false;
  handlePreview = (file: UploadFile) => {
    this.cargoImageUrl = file.url || file.thumbUrl;
    this.previewVisible = true;
    console.log('preview', this.cargoImageUrl);
  };
  //删除上传图片
  handleRemove = (file: UploadFile) => {
    console.log('handleRemove', file);
    console.log(this.img);
    if (this.img != null) {
      //服务器上删除该图片
      this.deleteFile();
      //回调重置
      this.fileList = [];
      this.img = null;
    }
  };
  //删除服务器上传图片
  deleteFile() {
    let urlArr: any = [this.img];//要删除的图片数组
    this.http.post('/ApolloManagement/file/deleteFile', urlArr, res => {
    }, 'json');
  }
  uploadFlag: boolean = true;//关闭弹框时是否非添加成功
  ngOnDestroy(): void {
    console.log('组件已销毁！', this.img);
    //删除上传图片
    if (this.img != null && this.uploadFlag == true) {
      this.deleteFile();
    }
  }
  //上传前验证
  beforeUpload = (file: UploadFile) => {
    console.log(file);
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    console.log('校验大小', this.fileList);
    const isLt10M = file.size / 1024 / 1024 < 10;
    const isImg = file.type.substr(0, 5);
    console.log(isImg);
    if (!isLt10M) {
      this.msg.error('图片大小不超过10MB!');
      this.fileList = [];
      return false;
    }
    if (isImg != 'image') {
      this.msg.error('只支持上传图片!');
      this.fileList = [];
      return false;
    }
    this.handleUpload();
    return false;
  };
  //开始上传
  handleUpload(): void {
    if (this.fileList.length == 0) { return }
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    console.log(formData);
    const req = new HttpRequest('POST', '/ApolloManagement/file/uploadFile', formData, {});
    console.log('开始上传');
    this.httpClient
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (res: any) => {
          this.fileList = [
            {
              uid: -1,
              name: 'xxx.png',
              status: 'done',
              url: res.body.data
            }
          ];
          console.log(res.body.data);//地址
          this.img = res.body.data;
          this.msg.success('上传成功！');
        },
        () => {
          this.msg.error('上传失败！');
        }
      );
  }
  //完成，上传物流图片
  complete() {
    if (this.logisticsId == '') { this.msg.warning('请输入物流公司！'); return }
    if (this.logisticsInfo == '') { this.msg.warning('请输入物流编号！'); return }
    if (this.img == null) { this.msg.warning('请上传图片！'); return }
    let data =
    {
      "id": this.list.id,
      "logisticsId": this.logisticsId,
      "logisticsImg": this.img,
      "logisticsInfo": this.logisticsInfo,
      "state": 3,
      "preReportId": this.list.preReportId
    };
    console.log(data);
    this.http.post('/ApolloManagement/outStorage/shipCargo', data, res => {
      this.uploadFlag = false;
      this.msg.success('已完成！');
      this.bsModalRef.hide();
      this.outStockService.toSearch();
    }, 'json')
  }
}
