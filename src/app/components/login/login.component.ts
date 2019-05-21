import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../../service/public.service';
import { HttpService } from '../../service/http.service';
import { RouterConfigService } from '../../service/router-config.service';
import { Load } from '../../service/load';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { } from 'jquery';

import { StartComponent } from '../../components/admin/pages/start/start.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  tipFlag: any = {
    account: false,
    password: false
  }
  companyList: any[] = [];
  roleList: any[] = [];
  validateForm: FormGroup;
  constructor(private fb: FormBuilder, public publicService: PublicService,public routerConfigService:RouterConfigService,
    private message: NzMessageService, private router: Router, public load: Load,public http:HttpService) { }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      account: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{3,16}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,20}$/)]],
      companyId: [null, [Validators.required]],
      companyRoleId: [null, [Validators.required]],
      remember: [true]
    });
    this.publicService.getAllCompany((data, map) => {
      this.companyList = data;
    });
  }
  login(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.validateForm.value);
    if (this.validateForm.value.account == null) { this.message.warning('请输入账号'); return }
    if (this.validateForm.value.password == null) { this.message.warning('请输入密码'); return }
    if (this.validateForm.value.companyId == null) { this.message.warning('请选择公司'); return }
    if (this.validateForm.value.companyRoleId == null) { this.message.warning('请选择角色'); return }
    this.load.isLoading = true;
    let data = {
      account: this.validateForm.value.account == null ? "" : this.validateForm.value.account,
      password: this.validateForm.value.password == null ? "" : this.validateForm.value.password,
      companyId: this.validateForm.value.companyId == null ? "" : this.validateForm.value.companyId,
      companyRoleId: this.validateForm.value.companyRoleId == null ? "" : this.validateForm.value.companyRoleId
    };
    console.log(data);
    this.http.post('/ApolloManagement/login/loginUser', data, (res) => {
      console.log(res);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("menu", JSON.stringify(res.data.menu));
      // this.setRouter(res.data.menu);
      //获取公司状态
      this.publicService.getCompanyType((data) => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        user.type = data.type;
        sessionStorage.setItem("user", JSON.stringify(user));
        this.load.isLoading = false;
        this.router.navigate(['/admin']);
      })
    }, 'www');
  }
  //根据菜单动态配置路由
  setRouter(menulists) {
    let componentList = this.routerConfigService.routersArr;
    this.router.config[1].children = [];
    for (let i = 0; i < menulists.length; i++) {
      for (let j = 0; j < menulists[i].childMenus.length; j++) {
        for (let n = 0; n < componentList.length; n++) {
          if (menulists[i].childMenus[j].urlPath == componentList[n].path) {
            // console.log(this.componentList[n].path);
            this.router.config[1].children.push(componentList[n]);
          }
        }
      }
    }
    this.router.config[1].children.unshift({ path: '', redirectTo: 'start', pathMatch: 'full' }, { path: 'start', component: StartComponent });
    this.router.config[1].children.push({ path: '**', redirectTo: 'start', pathMatch: 'full' });
    this.router.resetConfig(this.router.config);
    // console.log('动态配置路由', this.router.config);
    sessionStorage.setItem('routerConfig', JSON.stringify(this.router.config[1].children));
  }
  //选择公司获取角色
  selectRoles(id) {
    console.log(id);
    if (id == null) { this.validateForm.get('companyRoleId').setValue(null); this.roleList = []; return; }
    this.publicService.getCompanyRole(id, (data, map) => {
      this.roleList = data;
      this.validateForm.get('companyRoleId').setValue(null);
    });
  }

}
