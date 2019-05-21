import { Component, OnInit } from '@angular/core';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyRoleService } from '../../../../../service/company-role.service';
import { HttpService } from '../../../../../service/http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-company-role',
  templateUrl: './edit-company-role.component.html',
  styleUrls: ['./edit-company-role.component.css']
})
export class EditCompanyRoleComponent implements OnInit {
  list:any;
  companyRoleObj:any;
  constructor(public bsModalRef : BsModalRef,public companyRoleService : CompanyRoleService,private http:HttpService,private message:NzMessageService) { }

  ngOnInit() {
    this.companyRoleObj = JSON.parse(JSON.stringify(this.list));
  }
  editCompanyRole(){
    var data = {
      "id" : this.companyRoleObj.id,
      "description" : this.companyRoleObj.description
    };
    console.log(data);
    this.http.post('/ApolloManagement/companyRole/updateRole', data, res => {
      if(res.meta.success == true){
        this.message.success('修改成功！');
        this.companyRoleService.searchCompanyRole();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}