import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StaffService } from '../../../../../service/staff.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  loadedFlag: boolean = false;
  roleList: any;
  roleLists: any = [];
  account: any = '';
  password: any = '';
  confirmpass: any = '';
  name: any = '';
  email: any = '';
  telephone: any = '';
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public staffService: StaffService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.roleLists = JSON.parse(JSON.stringify(this.roleList));
    console.log(this.roleLists);
    // 初始化角色列表
    for (let i = 0; i < this.roleLists.length; i++) {
      this.roleLists[i].checked = false;
      this.roleLists[i].value = this.roleLists[i].id;
      this.roleLists[i].label = this.roleLists[i].roleName;
    }
    this.loadedFlag = true;
  }
  addStaff() {
    // var checkID:any = [];
    // $("input[name='edit_roles']:checked").each(function(i){
    //   checkID[i] = $(this).val();
    // });
    // var roles = checkID.join(',');
    var checkID: any = [];
    for (let i = 0; i < this.roleLists.length; i++) {
      if (this.roleLists[i].checked) checkID.push(this.roleLists[i].value);
    }
    var roles = checkID.join(',');
    if (this.account == '') { this.message.warning('请输入员工账号'); return }
    if (this.password == '') { this.message.warning('请输入密码'); return }
    if (this.confirmpass != this.password) { this.message.warning('确认密码错误'); return }
    if (this.name == '') { this.message.warning('请输入员工姓名'); return }
    if (this.telephone == '') { this.message.warning('请输入联系电话'); return }
    // if(roles == ''){this.message.warning('请选择员工角色');return}
    if (sessionStorage.getItem('user') != null) {
      var data = {
        "account": this.account,
        "password": this.password,
        "companyId": JSON.parse(sessionStorage.getItem('user')).companyId,
        "name": this.name,
        "email": this.email,
        "telephone": this.telephone,
        "userRoleId": roles
      };
      console.log(data);
      this.http.post('/ApolloManagement/user/saveUser', data, res => {
        if (res.meta.success == true) {
          this.message.success('添加成功！');
          this.staffService.searchStaff();
          this.bsModalRef.hide();
        }
      }, 'json');
    }
  }
}
