import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { StaffRoleService } from '../../../../service/staff-role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AddStaffRoleComponent } from '../staff-role-manage/add-staff-role/add-staff-role.component';
import { AuthStaffRoleComponent } from '../staff-role-manage/auth-staff-role/auth-staff-role.component';
import { EditStaffRoleComponent } from '../staff-role-manage/edit-staff-role/edit-staff-role.component';
@Component({
  selector: 'app-staff-role-manage',
  templateUrl: './staff-role-manage.component.html',
  styleUrls: ['./staff-role-manage.component.css'],
  providers: [BsModalRef]
})
export class StaffRoleManageComponent implements OnInit {
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public staffRoleService : StaffRoleService,
    private message : NzMessageService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('user') != null) {
      this.searchRole();
    }
  }
  addRole() {
    this.bsModalRef = this.modalService.show(
      AddStaffRoleComponent,
      Object.assign({}, { ignoreBackdropClick: true })
    );
  }
  searchRole() {
    this.staffRoleService.searchRole();
  }
  editStaffRole(obj: any) {
    const initialState = {
      list: obj
    };
    this.bsModalRef = this.modalService.show(
      EditStaffRoleComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  authStaffRole(obj: any) {
    const initialState = {
      list: obj
    };
    this.bsModalRef = this.modalService.show(
      AuthStaffRoleComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  deleteStaffRole(id): void {
    this.http.post('/ApolloManagement/userRole/deleteRole', { roleId: id }, res => {
      if (res.meta.success == true) {
        this.message.success('删除成功！');
        this.staffRoleService.searchRole();
      } 
    }, 'www');
  }
}
