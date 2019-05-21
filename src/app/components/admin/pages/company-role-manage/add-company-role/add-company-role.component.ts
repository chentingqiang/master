import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { CompanyRoleService } from '../../../../../service/company-role.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-company-role',
  templateUrl: './add-company-role.component.html',
  styleUrls: ['./add-company-role.component.css']
})
export class AddCompanyRoleComponent implements OnInit {
  companyRoleName: any = '';
  description: any = '';
  constructor(public bsModalRef: BsModalRef, private http: HttpService, private message: NzMessageService, public companyRoleService: CompanyRoleService) { }

  ngOnInit() {
  }
  addCompanyRole() {
    if (this.companyRoleName == '') { this.message.warning('请输入角色名称！'); return; }
    var data = {
      "companyRoleName": this.companyRoleName,
      "description": this.description
    };
    console.log(data);
    this.http.post('/ApolloManagement/companyRole/saveUserRole', data, res => {
      if (res.meta.success == true) {
        this.message.success('添加成功！');
        this.companyRoleService.searchCompanyRole();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
