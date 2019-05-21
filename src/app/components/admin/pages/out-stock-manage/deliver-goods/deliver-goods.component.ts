import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { OutStockService } from '../../../../../service/out-stock.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
// import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-deliver-goods',
  templateUrl: './deliver-goods.component.html',
  styleUrls: ['./deliver-goods.component.css']
})
export class DeliverGoodsComponent implements OnInit {
  list: any;
  driverList: any[] = [];
  driverMap: any = new Map<string, string>();
  telephone: any = null;
  driverId: any = null;
  logisticsInfo: any = null;
  img: any = null;
  constructor(public publicService: PublicService, public httpService: HttpService,
    public http: HttpClient, public bsModalRef: BsModalRef, private msg: NzMessageService,
    public OutStockService: OutStockService) { }
  ngOnInit() {
    //获取司机
    this.publicService.getDrivers((datas, maps) => {
      this.driverList = datas;
      this.driverMap = maps;
    })
    console.log(this.list);
  }
  //
  changeTel(e) {
    console.log(e);
    if (e == null) { return }
    this.telephone = this.driverMap.get(e).telephone;
  }

  fileList: any = [];
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
    console.log('preview', this.previewImage);
  };
  //删除上传图片
  handleRemove = (file: UploadFile) => {
    console.log('handleRemove', file);
    console.log(this.img);
    if (this.img != null) {
      //服务器上删除该图片
      //回调重置
      this.fileList = [];
      this.img = null;
    }
  };
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
    this.http
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
  //发货
  handle() {
    if (this.driverId == null) { this.msg.warning('请选择司机名称！'); return }
    if (this.telephone == null) { this.msg.warning('请输入司机电话！'); return }
    if (this.logisticsInfo == null) { this.msg.warning('请输入物流编号！'); return }
    if (this.img == null) { this.msg.warning('请上传图片！'); return }
    let data =
    {
      'driverId': this.driverId,
      "driverName": this.driverMap.get(this.driverId).name,
      "driverPhone": this.driverMap.get(this.driverId).telephone,
      "id": this.list.id,
      "logisticsImg": this.img,
      "logisticsInfo": this.logisticsInfo,
      "preReportId": this.list.preReportId
    };
    console.log(data);
    this.httpService.post('/ApolloManagement/outStorage/shipCargo', data, res => {
      this.msg.success('发货成功！');
      this.bsModalRef.hide();
      this.OutStockService.toSearch();
    }, 'json')
  }
}
