import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { GoodsService } from '../../../../../service/goods.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.css']
})
export class AddGoodsComponent implements OnInit {
  errObj: any = {
    nzVisible1: false,
    nzVisible2: false,
    nzVisible3: false,
    errorMsg1: '',
    errorMsg2: '',
    errorMsg3: ''
  };
  goodsTypeList: any;//货物类型列表
  originPlaceList: any;//产地列表
  priceUnitList: any;//计价单位列表
  productionList: any;//厂家列表
  agentList: any;//代理商列表

  goodsNumber: any = '';//货物编号
  goodsName: any = '';//货物名称
  goodsType: any = '';//货物类别
  production: any = '';//厂家
  agent: any = '';//代理商
  orignPlace: any = '';//产地
  priceUnit: any = '';//计量单位
  priceUnitNumber: any = '';//单位子数量
  volume: any = '';//体积
  weight: any = '';//重量
  boxBarCode: any = '';//箱条形码
  packageBarCode: any = '';//袋条形码
  description: any = '';//描述
  img: any = null;
  constructor(public bsModalRef: BsModalRef, private http: HttpClient, public httpService: HttpService, private msg: NzMessageService, private goodsService: GoodsService) { }
  fileList: any = [];
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;
  //预览图片
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
      this.deleteFile();
      //回调重置
      this.fileList = [];
      this.img = null;
    }
  };
  //删除服务器上传图片
  deleteFile() {
    let urlArr: any = [this.img];//要删除的图片数组
    console.log('开始删除', urlArr);
    this.httpService.post('/ApolloManagement/file/deleteFile', urlArr, res => {
    }, 'json');
  }
  uploadFlag: boolean = true;//关闭弹框时是否非添加成功
  ngOnDestroy(): void {
    console.log('组件已销毁！', this.img);
    //删除上传图片
    if (this.img != null && this.uploadFlag == true) {
      console.log('删除网络图片');
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
  ngOnInit() {
  }
  checkNumbers(val, type) {
    console.log(val);
    if (type == 1) {//验证数量类型
      let reg = /^[1-9]\d*$/;
      if (!reg.test(val)) { this.errObj.nzVisible1 = true; this.errObj.errorMsg1 = '数量格式错误'; return false }
      else { this.errObj.nzVisible1 = false; this.errObj.errorMsg1 = ''; return true }
    } else if (type == 2) {//验证体积
      if (val <= 0) { this.errObj.nzVisible2 = true; this.errObj.errorMsg2 = '体积格式错误'; return false }
      else { this.errObj.nzVisible2 = false; this.errObj.errorMsg2 = ''; return true }
    } else {//验证重量
      if (val <= 0) { this.errObj.nzVisible3 = true; this.errObj.errorMsg3 = '重量格式错误'; return false }
      else { this.errObj.nzVisible3 = false; this.errObj.errorMsg3 = ''; return true }
    }
  }
  addGoods() {
    if (this.goodsNumber == '') { this.msg.error('请输入货物编号'); return; }
    if (this.goodsName == '') { this.msg.error('请输入货物名称'); return; }
    if (this.goodsType == '') { this.msg.error('请选择货物类别'); return; }
    if (this.img == null) { this.msg.error('请上传商品图片'); return; }
    // if (this.production == '') { this.msg.error('请选择厂家'); return; }
    // if (this.agent == '') { this.msg.error('请选择代理商'); return; }
    if (this.orignPlace == '') { this.msg.error('请选择产地'); return; }
    if (this.priceUnit == '') { this.msg.error('请选择计量单位'); return; }
    if (this.priceUnitNumber == '') { this.msg.error('请输入单位子数量'); return; }
    if (!this.checkNumbers(this.priceUnitNumber, 1)) { return; }
    if (this.boxBarCode == '') { this.msg.error('请输入箱条形码'); return; }
    if (this.packageBarCode == '') { this.msg.error('请输入袋条形码'); return; }
    var data =
    {
      "agentId": this.agent,
      "boxBarCode": this.boxBarCode,//箱条形码
      "cargoImageUrl": this.img,//货物图片地址
      "cargoName": this.goodsName,//货物名称
      "cargoNumber": this.goodsNumber,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "descrption": this.description,
      "measUnitId": this.priceUnit,
      "packageBarCode": this.packageBarCode,//袋条形码
      "plantId": this.production,
      "producePlaceId": this.orignPlace,
      "splitNumber": this.priceUnitNumber,
      "state": true,
      "typeId": this.goodsType,
      "volume": this.volume,
      "weight": this.weight
    }
    console.log(data);
    this.httpService.post('/ApolloManagement/cargo/addCargo', data, res => {
      if (res.meta.success == true) {
        this.uploadFlag = false;
        this.msg.success('添加成功！');
        this.goodsService.searchGoods();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
