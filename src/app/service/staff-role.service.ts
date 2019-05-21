import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class StaffRoleService {
  staffRoleList: any[] = [];
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { }
  searchRole() {
    this.load.loading5 = true;
    var data = {
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId
    }
    this.http.post('/ApolloManagement/userRole/getUserRole', data, res => {
      if (res.meta.success == true) {
        this.staffRoleList = res.data;
        this.load.loading5 = false;
      }
    }, 'www');
  }
}
