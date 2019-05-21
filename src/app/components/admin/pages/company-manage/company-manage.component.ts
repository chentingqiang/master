import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PublicService } from '../../../../service/public.service';
import { CommonService } from '../../../../service/common.service';
import { EditCompanyComponent } from '../company-manage/edit-company/edit-company.component';
import { ViewCompanyComponent } from '../company-manage/view-company/view-company.component';
import { AddCompanyComponent } from '../company-manage/add-company/add-company.component';
@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.css']
})
export class CompanyManageComponent implements OnInit {
  modalRef: BsModalRef;
  bsModalRef2: BsModalRef;
  constructor(private http: HttpService, private message: NzMessageService, public commonService: CommonService, private modalService: BsModalService, private publicService: PublicService) { }
  ngOnInit() {
    //获取全部角色
    this.publicService.getRoleList((data) => {
      this.commonService.roleList = data;
      this.publicService.getProvince((data) => {
        this.commonService.provinceList = data;
        this.commonService.searchCompany();
      });
    });
  }
  //选择省份
  selectProvince(e: any) {
    if (e == null) { this.commonService.city_id = null; return }
    this.publicService.getCity(e, (data) => {
      this.commonService.cityList = data;
      this.commonService.city_id = null;
    })
  }
  // 搜索企业
  searchCompany() {
    this.commonService.searchCompany();
  }
  //添加企业
  addCompany() {
    const initialState = {
      roleLists: this.commonService.roleList,
      provinceList: this.commonService.provinceList
    };
    this.modalRef = this.modalService.show(
      AddCompanyComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-xs' })
    );
  }
  //编辑企业信息
  editCompany(obj: any) {
    const initialState = {
      list: obj,
      roleLists: this.commonService.roleList,
      provinceList: this.commonService.provinceList
    };
    this.modalRef = this.modalService.show(
      EditCompanyComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true }, { class: 'modal-xs' })
    );
  }
  //删除企业
  deleteCompany(id) {
    this.http.post('/ApolloManagement/company/deleteCompanyById', { "id": id }, res => {
      if (res.meta.success == true) {
        this.searchCompany();
        this.message.success('删除成功！');
      }
    }, 'www');
  }
  //查看企业
  viewCompany(obj) {
    var initialState = {
      list: obj
    };
    this.modalRef = this.modalService.show(
      ViewCompanyComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  //打印企业信息
  printCompany(obj) {
    console.log('打印企业信息', obj);
  }
  //重置企业密码
  resetpassCompany(obj) {
    console.log('重置企业密码', obj);
  }
}
