import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staffName: any = '';
  tel: any = '';
  roleId: any = null;
  roleList: any[] = [];
  staffList: any[] = [];
  roleMap: any = new Map<string, string>();
  constructor(private http: HttpService, private message: NzMessageService, public load: Load) { }
  searchStaff() {
    if (sessionStorage.getItem('user') != null) {
      var data =
      {
        // "account": this.staffName,
        "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "name": this.staffName,
        "telephone": this.tel,
        "userRoleId": this.roleId == null ? "" : this.roleId
      };
      this.load.loading4 = true;
      this.http.post('/ApolloManagement/user/findUser', data, res => {
        if (res.meta.success == true) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].userRoleId != null) {
              res.data[i].userRoleNames = res.data[i].userRoleId.split(',');
              res.data[i].userRoleNames = this.changeRole(res.data[i].userRoleNames);
            } else {
              res.data[i].userRoleNames = '';
            }
          }
          this.staffList = res.data;
          this.load.loading4 = false;
        }
      }, 'json');
    }
  }
  addStr(e, roles) {
    for (let index = 0; index < roles.length; index++) {
      if (roles[index].id == e) {
        return roles[index].roleName;
      }
    }
    return "";
  }
  //角色id与名称匹配
  changeRole(arr) {
    // console.log(arr);
    var roles = this.roleList;//全部角色
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      var s = this.addStr(arr[i], roles);
      // console.log(s);
      if (s) {
        str += s + ",";
      }
    }
    if (str) {
      str = str.substring(0, str.length - 1);
    }
    return str;
  }
}
