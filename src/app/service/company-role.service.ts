import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Load } from './load';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class CompanyRoleService {
  public roleNum:any = '';
  public roleName:any = null;
  public description:any = '';
  public companyRoleList:any[] = [];
  public companyRoleObj:any = {};
  constructor(private http: HttpService,private message:NzMessageService,public load:Load) { };
  deleteCompanyRole(id){
    this.http.post('/ApolloManagement/companyRole/deleteRole', {roleId:id}, res => {
      if(res.meta.success == true){
        this.message.success('删除成功！');
        this.searchCompanyRole();
      }
    }, 'www');
  }
  searchCompanyRole(){
    var datas = {
      "companyRoleName":this.roleName==null?"":this.roleName,
      "description" : this.description,
      "id" : this.roleNum
    };
    console.log(datas);
    this.load.loading2 = true;
    this.http.post('/ApolloManagement/companyRole/findCompanyRole', datas, res => {
      console.log(res);
      if(res.meta.success == true){
        this.companyRoleList = res.data;
        this.load.loading2 = false;
      }
    }, 'json');
  }
}
