import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StaffService } from '../../../../../service/staff.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
  public paramsObj:any = {};
  roleList: any;
  roleLists: any;
  list: any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService,public staffService : StaffService,
    private message : NzMessageService) { }

  ngOnInit() {
    this.paramsObj = JSON.parse(JSON.stringify(this.list));
    this.roleLists = JSON.parse(JSON.stringify(this.roleList));
    // 初始化角色列表
    for (let i = 0; i < this.roleLists.length; i++) {
      this.roleLists[i].checked = false;
      this.roleLists[i].value = this.roleLists[i].id;
      this.roleLists[i].label = this.roleLists[i].roleName;
    }
    this.setRole();
  }
  // 设置角色
  setRole() {
    if(this.paramsObj.userRoleId != null){
      let roleArr = this.paramsObj.userRoleId.split(',');
      console.log(roleArr, this.roleLists);
      for (let i = 0; i < roleArr.length; i++) {
        for (let j = 0; j < this.roleLists.length; j++) {
          if (roleArr[i] == this.roleLists[j].id) {
            this.roleLists[j].checked = true;
          }
        }
      }
    }
  }
  editStaff() {
    var checkID: any = [];
    for (let i = 0; i < this.roleLists.length; i++) {
      if (this.roleLists[i].checked) checkID.push(this.roleLists[i].value);
    }
    var roles = checkID.join(',');
    if( this.paramsObj.telephone == ''){this.message.warning('请输入联系电话');return}
    // if( roles == ''){this.message.warning('请选择角色');return}
    var data = {
      "id": this.paramsObj.id,
      // "password" : this.paramsObj.password,
      "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
      "email": this.paramsObj.email,
      "telephone": this.paramsObj.telephone,
      "userRoleId": roles
    };
    console.log(data);
    this.http.post('/ApolloManagement/user/updateUser', data, res => {
      if (res.meta.success == true) {
        // alert('修改成功！');
        this.message.success('修改成功！');
        this.staffService.searchStaff();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'json');
  }
}
