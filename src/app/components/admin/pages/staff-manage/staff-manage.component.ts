import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { StaffService } from '../../../../service/staff.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { EditpassStaffComponent } from './editpass-staff/editpass-staff.component';
@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css'],
  providers: [BsModalRef]
})
export class StaffManageComponent implements OnInit {
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    public staffService: StaffService,
    private message: NzMessageService
  ) { }
  ngOnInit() {
    this.getUserRole();
  }
  //获取公司角色列表
  getUserRole() {
    if (sessionStorage.getItem('user') != null) {
      this.http.post('/ApolloManagement/userRole/getUserRole', { "companyId": JSON.parse(sessionStorage.getItem('user')).companyId }, res => {
        if (res.meta.success == true) {
          this.staffService.roleList = res.data;
          for (let i = 0; i < res.data.length; i++) {
            this.staffService.roleMap.set(res.data[i].id, res.data[i].roleName);
          }
          this.staffService.searchStaff();
        }
      }, 'www');
    }
  }
  addStaff() {
    const initialState = {
      roleList: this.staffService.roleList
    };
    this.bsModalRef = this.modalService.show(
      AddStaffComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  searchStaff() {
    this.staffService.searchStaff();
  }
  deleteStaff(id): void {
    this.http.post('/ApolloManagement/user/deleteUser', { id: id }, res => {
      if (res.meta.success == true) {
        this.message.success('删除成功！');
        this.staffService.searchStaff();
      }
    }, 'www');
  }
  editStaff(obj: any) {
    const initialState = {
      list: obj,
      roleList: this.staffService.roleList
    };
    this.bsModalRef = this.modalService.show(
      EditStaffComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  editStaffPass(obj: any) {
    const initialState = {
      list: obj
    };
    this.bsModalRef = this.modalService.show(
      EditpassStaffComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  viewStaff(obj: any) {
    const initialState = {
      list: obj,
      roleMap: this.staffService.roleMap
    };
    this.bsModalRef = this.modalService.show(
      ViewStaffComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
}
