import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../service/http.service';
import { CommonService } from '../../../../../service/common.service';
import { PublicService } from '../../../../../service/public.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  provinceList: any = [];
  optList: any[] = [];
  roleLists: any;
  cityList: any = [];
  roleList: any = [];
  list: any;
  lists: any;
  constructor(private http: HttpService, public commonService: CommonService, public publicService: PublicService, public bsModalRef1: BsModalRef, private message: NzMessageService) { }
  ngOnInit() {
    console.log(this.list);
    this.lists = JSON.parse(JSON.stringify(this.list));
    this.roleList = JSON.parse(JSON.stringify(this.roleLists));
    this.setRole();//设置角色
    this.setProvince();//设置省份
    //是否为运营公司
    this.publicService.getOptList((datas, maps) => {
      this.optList = datas;
    })
  }
  // 提交编辑企业信息
  commit() {
    var checkID: any = [];
    for (let i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].checked) checkID.push(this.roleList[i].value);
    }
    var roles = checkID.join(',');
    if (roles == '') { this.message.error('请选择企业角色'); return; }
    if (this.lists.province.areaid == null) { this.message.error('请选择省份'); return; }
    if (this.lists.city.areaid == null) { this.message.error('请选择市县'); return; }
    if (this.lists.address == null) { this.message.error('请输入详细地址'); return; }
    var c_principal = {
      "account": this.lists.principal.account,
      "email": this.lists.principal.email,
      "name": this.lists.principal.name,
      "telephone": this.lists.principal.telephone
    }
    var data = {
      "companyRoleId": roles,
      "companyName": this.lists.companyName,
      "cityId": this.lists.city.areaid,
      "provinceId": this.lists.province.areaid,
      "phone": this.lists.phone,
      "principal": c_principal,
      "address": this.lists.address,
      "alipayId": this.lists.alipayId,
      "bankCard": this.lists.bankCard,
      "bankName": this.lists.bankName,
      "weixinId": this.lists.weixinId,
      "scloudpayId": this.lists.scloudpayId,
      "id": this.lists.id,
      "type":this.lists.type
    };
    console.log(data);
    this.http.post('/ApolloManagement/company/updateCompany', data, res => {
      if (res.meta.success == true) {
        this.message.success('修改成功！');
        this.commonService.searchCompany();
        this.bsModalRef1.hide();
      }
    }, 'json');
  }
  //设置省份
  setProvince() {
    this.publicService.getProvince((data) => {
      this.provinceList = data;
      // 设置城市
      this.publicService.getCity(this.list.province.areaid, (data) => {
        this.cityList = data;
      })
    })
  }
  //选择省份
  selectProvince(e) {
    if(e == null) {return}
    this.publicService.getCity(e, (data) => {
      this.cityList = data;
      this.lists.city.areaid = null;
    })
  }
  // 设置角色
  setRole() {
    // 初始化角色列表
    for (let i = 0; i < this.roleList.length; i++) {
      this.roleList[i].checked = false;
      this.roleList[i].value = this.roleList[i].id;
      this.roleList[i].label = this.roleList[i].companyRoleName;
    }
    if (this.list.companyRoleId != null) {
      let roleArr = this.list.companyRoleId.split(',');
      // console.log(roleArr, this.roleList);
      for (let i = 0; i < roleArr.length; i++) {
        for (let j = 0; j < this.roleList.length; j++) {
          if (roleArr[i] == this.roleList[j].id) {
            this.roleList[j].checked = true;
          }
        }
      }
    }
  }
}
