import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StaffRoleService } from '../../../../../service/staff-role.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-staff-role',
  templateUrl: './add-staff-role.component.html',
  styleUrls: ['./add-staff-role.component.css']
})
export class AddStaffRoleComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private http: HttpService, public staffRoleService: StaffRoleService,
    private message: NzMessageService) { }
  description: any = '';
  roleName: any = '';
  ngOnInit() {
  }
  addStaffRole() {
    if (this.roleName == '') { this.message.warning('请输入角色名称'); return; }
    var data =
    {
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "description": this.description,
      "roleName": this.roleName,
    };
    this.http.post('/ApolloManagement/userRole/saveUserRole', data, res => {
      if (res.meta.success == true) {
        this.message.success('添加成功！');
        this.staffRoleService.searchRole();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
}
