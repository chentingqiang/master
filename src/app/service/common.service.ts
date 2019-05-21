import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public companyObj: any = {};
  public companyList: any[] = [];
  public roleList: any[] = [];
  public nums: string = '';
  public account: string = '';
  public name: string = '';
  public contact: string = '';
  public tel: string = '';
  public startTime: any = null;
  public endTime: any = null;
  public role: string = null;
  public city_id: any = null;
  public province_id: any = null;
  public provinceList: any[] = [];
  public cityList: any[] = [];
  public pagenation: any = {
    page: 1,
    size: 10,
    total: 0
  };
  constructor(private http: HttpService, private message: NzMessageService,public load:Load) { 
  }
  //搜索企业
  searchCompany() {
    this.load.loading1 = true;
    var principal = {
      "account": this.account == null ? "" : this.account,
      "name": this.contact == null ? "" : this.contact,
      "telephone": this.tel == null ? "" : this.tel
    };
    var datas = {
      "companyName": this.name == null ? "" : this.name,
      "id": this.nums == null ? "" : this.nums,
      "companyRoleId": this.role == null ? "" : this.role,
      "principal": principal,
      "provinceId": this.province_id == null ? "" : this.province_id,
      "cityId": this.city_id == null ? "" : this.city_id,
    };
    console.log(datas);
    let started = (this.startTime == null || this.startTime == "") ? "" : this.http.transDate(this.startTime);
    let ended = (this.endTime == null || this.endTime == "") ? "" : this.http.transDate(this.endTime);
    let pagenation = "&page=" + this.pagenation.page + "&size=" + this.pagenation.size;
    console.log(started, '-', ended);
    this.http.post('/ApolloManagement/company/findCompany?beginDate=' + started + '&endDate=' + ended + pagenation, datas, res => {
      if (res.meta.success == true) {
        //增加一个flag与角色名称
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].companyRoleId != null) {
            res.data.list[i].companyRoleName = res.data.list[i].companyRoleId.split(',');
            res.data.list[i].companyRoleName = this.changeRole(res.data.list[i].companyRoleName);
          } else {
            res.data.list[i].companyRoleName = "";
          }
        }
        this.companyList = res.data.list;
        this.pagenation.total = res.data.total;
        this.load.loading1 = false;
      }
    }, 'json');
  }
  addStr(e, roles) {
    for (let index = 0; index < roles.length; index++) {
      if (roles[index].id == e) {
        return roles[index].companyRoleName;
      }
    }
    return "";
  }
  //角色id与名称匹配
  changeRole(arr) {
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
