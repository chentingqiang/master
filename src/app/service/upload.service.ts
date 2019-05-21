import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadFlag: boolean = true;//关闭弹框时是否非添加成功
  img: any = null;
  constructor(public http: HttpClient, public httpService: HttpService, private msg: NzMessageService) { }
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
    }
  };
  //删除服务器上传图片
  deleteFile() {
    let urlArr: any = [this.img];//要删除的图片数组
    this.httpService.post('/ApolloManagement/file/deleteFile', { url: urlArr }, res => {
      //回调重置
      this.fileList = [];
      this.img = null;
    }, 'json');
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
  // ngOnDestroy(): void {
  //   console.log('组件已销毁！', this.img);
  //   //删除上传图片
  //   if (this.img != null && this.uploadFlag == true) {
  //     this.deleteFile();
  //   }
  // }
}
