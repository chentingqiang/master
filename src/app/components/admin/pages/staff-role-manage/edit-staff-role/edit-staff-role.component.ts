import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StaffRoleService } from '../../../../../service/staff-role.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-staff-role',
  templateUrl: './edit-staff-role.component.html',
  styleUrls: ['./edit-staff-role.component.css']
})
export class EditStaffRoleComponent implements OnInit {
  list:any;
  public paramsObj:any = {};
  constructor(public bsModalRef: BsModalRef, private http: HttpService,public staffRoleService : StaffRoleService,
    private message : NzMessageService) { }

  ngOnInit() {
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
  }
  editStaffRole() {
    var data =
    {
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "description": this.paramsObj.description,
      "id":this.paramsObj.id
    };
    console.log(data);
    this.http.post('/ApolloManagement/userRole/modifyUserRole', data, res => {
      if (res.meta.success == true) {
        this.message.success('修改成功！');
        this.staffRoleService.searchRole();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'json');
  }
}
