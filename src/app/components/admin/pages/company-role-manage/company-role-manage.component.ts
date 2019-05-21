import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { CheckBoxService } from '../../../../service/check-box.service';
import { CompanyRoleService } from '../../../../service/company-role.service';
import { AddCompanyRoleComponent } from '../company-role-manage/add-company-role/add-company-role.component';
import { AuthCompanyRoleComponent } from '../company-role-manage/auth-company-role/auth-company-role.component';
import { EditCompanyRoleComponent } from '../company-role-manage/edit-company-role/edit-company-role.component';
@Component({
  selector: 'app-company-role-manage',
  templateUrl: './company-role-manage.component.html',
  styleUrls: ['./company-role-manage.component.css'],
  providers: [BsModalRef]
})
export class CompanyRoleManageComponent implements OnInit {
  constructor(
    private http: HttpService,
    public companyRoleService: CompanyRoleService,
    private modalService: BsModalService,
    public checkBoxService: CheckBoxService,
    public bsModalRef: BsModalRef
  ) { }
  ngOnInit() {
    this.companyRoleService.searchCompanyRole();
  }
  editCompanyRole(obj: any) {
    const initialState = {
      list: obj
    };
    this.bsModalRef = this.modalService.show(
      EditCompanyRoleComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  authCompanyRole(id) {
    const initialState = {
      idx: id
    };
    this.bsModalRef = this.modalService.show(
      AuthCompanyRoleComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  deleteCompanyRole(id): void {
    this.companyRoleService.deleteCompanyRole(id);
  }
  addCompanyRole() {
    this.bsModalRef = this.modalService.show(
      AddCompanyRoleComponent,
      Object.assign({}, { ignoreBackdropClick: true })
    );
  }
  searchCompanyRole() {
    this.companyRoleService.searchCompanyRole();
  }
}
