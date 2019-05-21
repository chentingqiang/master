import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Load } from './load';
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
// import { mergeMap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
    constructor(private message: NzMessageService, public load: Load) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => this.handleData(err))
        );
    }
    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        this.load.isLoading = false;
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
}