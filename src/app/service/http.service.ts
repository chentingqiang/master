import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { Load } from '../service/load';
import { Router } from '@angular/router';
@Injectable()
export class HttpService implements HttpInterceptor {
  public restServer;
  public http;
  constructor(public Http: HttpClient, public message: NzMessageService, public load: Load, private router: Router) {
    this.http = Http;
    // this.restServer = 'http://39.98.208.192:16443';//
    // this.restServer = 'https://www.apollo-wms.com';//9ejxNvx7aGw7rU^Y
    // this.restServer = 'http://192.168.0.241';
    // this.restServer = 'http://www.apollo-wms.com:8080';
    this.restServer = 'http://localhost:3000';
    // this.restServer = 'http://192.168.0.142';
    // this.restServer = 'http://localhost:8080';
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
  //拦截器处理error code
  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    this.resetFlag();
    // console.log(event.status);
    // 业务处理：一些通用操作
    switch (event.status) {
      case 403:
        break;
      case 404:
        this.message.error('链接找不到了！');
        break;
      case 500:
        this.message.error('服务器繁忙请稍后重试！');
        break;
      case 504:
        this.message.error('网络连接超时！请稍后重试！');
        break;
      default:
      // return of(event);
    }
    return throwError(event);
  }
  //序列化数据
  private transformRequest(obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
  }
  public get(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('get开始请求');
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.get(vm.restServer + url, { params: httpParams })
      .subscribe(data => {
        console.log('get请求结束', data);
        if (data.meta.success == false) {
          if (data.meta.code == 1000) {//未登录
            this.reLogin();
          }
        } else if (data.meta.success == true) {
          cb(data);
        }
      });
  }
  public post(url, data?: Object, cb?: Function, options?: Object) {
    console.log('post开始请求');
    const vm = this;
    if (options == 'www') {
      var headers = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) };
      data = this.transformRequest(data);
    } else if (options == 'json') {
      var headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) };
      data = JSON.stringify(data);
    }
    vm.http.post(vm.restServer + url, data, headers)
      .subscribe(res => {
        console.log('post请求结束', res);
        if (res.meta.success == false) {
          if (res.meta.code == 1000) {//未登录
            this.reLogin();
          }
          this.message.warning(res.meta.message);
          this.load.isLoading = false;
        } else if (res.meta.success == true) {
          cb(res);
        }
      });
  }
  public put(url, data?: Object, cb?: Function, options?: Object) {
    console.log('put开始请求');
    const vm = this;
    vm.http.put(vm.restServer + url, data, options)
      .subscribe(res => {
        console.log('put请求结束', res);
        cb(res);
      });
  }
  public delete(url, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('delete开始请求');
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.delete(vm.restServer + url, { params: httpParams })
      .subscribe(data => {
        console.log('delete请求结束', data);
        cb(data);
      });
  }
  //date转日期格式
  public transDate(date: any): any {
    if (date == undefined) { return ""; }
    var d = new Date(date);
    var ymd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return ymd;
  }
  //重新登录
  private reLogin() {
    this.message.warning('登录已过期，请重新登录！');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('menu');
    sessionStorage.removeItem('routerConfig');
    this.router.navigate(['/lease-login']);
  }
  //重置flag
  private resetFlag(){
    this.load.isLoading = false;
    this.load.loading1 = false;
    this.load.loading2 = false;
    this.load.loading3 = false;
  }
}