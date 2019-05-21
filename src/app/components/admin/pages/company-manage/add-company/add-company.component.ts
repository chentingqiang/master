import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { CommonService } from '../../../../../service/common.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  provinceList: any = [];
  cityList: any = [];
  optList: any[] = [];
  province_id: any = null;
  city_id: any = null;
  roleList: any = [];
  roleLists: any = [];
  oprator: any = 2;//默认非运营公司
  companyName: any = null;
  account: any = null;
  password: any = '';
  confirmpass: any = '';
  name: any = null;
  telephone: any = null;
  email: any = null;
  address: any = null;
  bankName: any = null;
  bankCard: any = null;
  alipayId: any = null;
  weixinId: any = null;
  scloudpayId: any = null;
  // c_remark: any = null;
  constructor(private http: HttpService, public bsModalRef: BsModalRef, private message: NzMessageService, public commonService: CommonService, public publicService: PublicService) { }
  ngOnInit() {
    this.roleList = JSON.parse(JSON.stringify(this.roleLists));
    // 初始化角色列表
    for (let i = 0; i < this.roleList.length; i++) {
      this.roleList[i].checked = false;
      this.roleList[i].value = this.roleList[i].id;
      this.roleList[i].label = this.roleList[i].companyRoleName;
    }
    //是否为运营公司
    this.publicService.getOptList((datas, maps) => {
      this.optList = datas;
    })
  }
  //提交
  addCompany() {
    var checkID: any = [];
    for (let i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].checked) checkID.push(this.roleList[i].value);
    }
    var roles = checkID.join(',');
    if (this.companyName == '') { this.message.error('请输入企业名称'); return; }
    if (roles == '') { this.message.error('请选择企业角色'); return; }
    if (this.account == '') { this.message.error('请输入登录账号'); return; }
    if (this.password == '') { this.message.error('请输入登录密码'); return; }
    if (this.password != this.confirmpass) { this.message.error('确认密码错误'); return; }
    if (this.name == '') { this.message.error('请输入负责人姓名'); return; }
    if (this.telephone == '') { this.message.error('请输入负责人电话'); return; }
    if (this.email == '') { this.message.error('请输入负责人邮箱'); return; }
    if (this.province_id == null) { this.message.error('请选择省份'); return; }
    if (this.city_id == null) { this.message.error('请选择市县'); return; }
    var c_principal = {
      "account": this.account,
      "email": this.email,
      "name": this.name,
      "password": this.password,
      "telephone": this.telephone
    }
    var datas = {
      "companyRoleId": roles,
      "companyName": this.companyName,
      "cityId": this.city_id,
      "provinceId": this.province_id,
      "phone": this.telephone,
      "principal": c_principal,
      "address": this.address,
      "alipayId": this.alipayId,
      "bankCard": this.bankCard,
      "bankName": this.bankName,
      "weixinId": this.weixinId,
      "scloudpayId": this.scloudpayId,
      "type": this.oprator
    };
    console.log(datas);
    this.http.post('/ApolloManagement/company/addCompany', datas, res => {
      if (res.meta.success == true) {
        this.message.success('添加成功!');
        this.commonService.searchCompany();
        this.bsModalRef.hide();
      }
    }, 'json');
  }
  //选择省份获取市县
  selectProvince(parentId) {
    this.publicService.getCity(parentId, (data) => {
      this.cityList = data;
      this.city_id = null;
    })
  }
}
