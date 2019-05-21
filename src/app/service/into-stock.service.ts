import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class IntoStockService {
  constructor(private http: HttpService, private message: NzMessageService) { }
}
