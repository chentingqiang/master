import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { GoodsService } from '../../../../../service/goods.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-edit-goods',
  templateUrl: './edit-goods.component.html',
  styleUrls: ['./edit-goods.component.css']
})
export class EditGoodsComponent implements OnInit {
  public paramsObj: any = {};
  list: any;
  goodsTypeList: any;//货物类别列表
  originPlaceList: any;//产地列表
  priceUnitList: any;//计量单位列表
  productionList: any;//厂家列表
  agentList: any;//代理商列表
  constructor(public bsModalRef: BsModalRef, private http: HttpClient, private httpService: HttpService, private msg: NzMessageService, private goodsService: GoodsService) { }
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
    console.log(this.paramsObj.cargoImageUrl);
    if (this.paramsObj.cargoImageUrl != null) {
      //服务器上删除该图片
      this.deleteFile();
      //回调重置
      this.fileList = [];
      this.paramsObj.cargoImageUrl = null;
    }
  };
  //删除服务器上传图片
  deleteFile() {
    let urlArr: any = [this.paramsObj.cargoImageUrl];//要删除的图片数组
    this.httpService.post('/ApolloManagement/file/deleteFile', urlArr, res => {
    }, 'json');
  }
  uploadFlag: boolean = true;//关闭弹框时是否非添加成功
  img1: any;
  ngOnInit() {
    console.log(this.list);
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
    this.img1 = this.list.cargoImageUrl;//未编辑的图片
    this.fileList.push({
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: this.paramsObj.cargoImageUrl
    });
  }
  ngOnDestroy(): void {
    console.log('组件已销毁！', this.paramsObj.cargoImageUrl);
    //删除上传图片
    if (this.paramsObj.cargoImageUrl != null && this.uploadFlag == true && this.paramsObj.cargoImageUrl != this.img1) {
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
          this.paramsObj.cargoImageUrl = res.body.data;
          this.msg.success('上传成功！');
        },
        () => {
          this.msg.error('上传失败！');
        }
      );
  }

  checkNumbers(val, type) {
    console.log(val);
    if (type == 1) {//验证数量类型
      let reg = /^[1-9]\d*$/;
      if (!reg.test(val)) { return false }
      else { return true }
    } else if (type == 2) {//验证体积
      if (val <= 0) { return false }
      else { return true }
    } else {//验证重量
      if (val <= 0) { return false }
      else { return true }
    }
  }
  editGoods() {
    if (this.paramsObj.cargoNumber == '') { this.msg.error('请输入货物编号'); return; }
    if (this.paramsObj.cargoName == '') { this.msg.error('请输入货物名称'); return; }
    if (this.paramsObj.typeId == '') { this.msg.error('请选择货物类别'); return; }
    if (this.paramsObj.cargoImageUrl == null) { this.msg.error('请上传商品图片'); return; }
    // if (this.paramsObj.plantId == '') { this.msg.error('请选择厂家'); return; }
    // if (this.paramsObj.agentId == '') { this.msg.error('请选择代理商'); return; }
    if (this.paramsObj.producePlaceId == '') { this.msg.error('请选择产地'); return; }
    if (this.paramsObj.measUnitId == '') { this.msg.error('请选择计量单位'); return; }
    if (this.paramsObj.splitNumber == '') { this.msg.error('请输入单位子数量'); return; }
    if (!this.checkNumbers(this.paramsObj.splitNumber, 1)) { this.msg.error('单位子数量格式错误'); return; }
    if (!this.checkNumbers(this.paramsObj.volume, 2)) { this.msg.error('体积格式错误'); return; }
    if (!this.checkNumbers(this.paramsObj.weight, 3)) { this.msg.error('重量格式错误'); return; }
    if (this.paramsObj.boxBarCode == '') { this.msg.error('请输入箱条形码'); return; }
    if (this.paramsObj.packageBarCode == '') { this.msg.error('请输入袋条形码'); return; }
    var data =
    {
      "id": this.paramsObj.id,
      "agentId": this.paramsObj.agentId,
      "boxBarCode": this.paramsObj.boxBarCode,//箱条形码
      "cargoImageUrl": this.paramsObj.cargoImageUrl,//货物图片地址
      "cargoName": this.paramsObj.cargoName,//货物名称
      "cargoNumber": this.paramsObj.cargoNumber,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "descrption": this.paramsObj.descrption,
      "measUnitId": this.paramsObj.measUnitId,
      "packageBarCode": this.paramsObj.packageBarCode,//袋条形码
      "plantId": this.paramsObj.plantId,
      "producePlaceId": this.paramsObj.producePlaceId,
      "splitNumber": this.paramsObj.splitNumber,
      "typeId": this.paramsObj.typeId,
      "volume": this.paramsObj.volume,
      "weight": this.paramsObj.weight
    }
    console.log(data);
    this.httpService.post('/ApolloManagement/cargo/updateCargo', data, res => {
      if (res.meta.success == true) {
        this.uploadFlag = false;
        this.msg.success('编辑成功！');
        this.goodsService.searchGoods();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}