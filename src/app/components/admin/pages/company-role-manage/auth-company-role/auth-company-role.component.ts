import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { CompanyRoleService } from '../../../../../service/company-role.service';
@Component({
  selector: 'app-auth-company-role',
  templateUrl: './auth-company-role.component.html',
  styleUrls: ['./auth-company-role.component.css']
})
export class AuthCompanyRoleComponent implements OnInit {
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  allMenus: any[] = [];
  idx: any;
  defaultCheckedKeys = [];
  defaultCheckedKey = [];
  nodes: any = [];
  nodeList: any[] = [];
  loadedFlag :boolean = false;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, private message: NzMessageService, public companyRoleService: CompanyRoleService) { }

  ngOnInit() {
    console.log('初始化', this.idx);
    //获取所有系统菜单
    this.http.get('/ApolloManagement/menu/getSystemMenuList', false, resp => {
      console.log(resp);
      if (resp.meta.success == true) {
        for (let i = 0; i < resp.data.length; i++) {
          this.nodes.push({ id: resp.data[i].id, title: resp.data[i].menuName, key: resp.data[i].id, children: [] });
          for (let j = 0; j < resp.data[i].childMenus.length; j++) {
            this.nodes[i].children.push({ id: resp.data[i].childMenus[j].id, title: resp.data[i].childMenus[j].menuName, key: resp.data[i].childMenus[j].id, children: [] });
          }
        }
        this.nodeList = this.nodes;
        //获取此企业角色的菜单
        this.http.get('/ApolloManagement/menu/getCompanyRoleMenus?roleId=' + this.idx, false, res => {
          if (res.meta.success == true) {
            //匹配
            this.forLists(resp.data, res.data);
            this.defaultCheckedKeys = this.defaultCheckedKey;
            console.log('默认选择', this.defaultCheckedKey);
            this.loadedFlag = true;
          }
        });
      }
    });
  }
  //递归赋值
  forLists(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j].id == arr1[i].id) {
          if (arr1[i].childMenus.length == 0) {
            this.defaultCheckedKey.push(arr1[i].id);
          }
        }
      }
      if (arr1[i].childMenus.length > 0) {
        this.forLists(arr1[i].childMenus, arr2);
      }
    }
  }
  authCompanyRole() {
    var arr = this.nzTreeComponent.getCheckedNodeList();
    var arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr2.push(arr[i].key);
      if (arr[i].children.length != 0) {
        for (let j = 0; j < arr[i].children.length; j++) {
          arr2.push(arr[i].children[j].key);
        }
      }
    }
    var arr3 = this.nzTreeComponent.getHalfCheckedNodeList();
    for (let i = 0; i < arr3.length; i++) {
      arr2.push(arr3[i].key);
    }
    console.log(arr2.join(','));
    this.http.post('/ApolloManagement/companyRole/powerMenus', { "roleId": this.idx, "menuId": arr2.join(',') }, res => {
      if (res.meta.success == true) {
        this.message.success('修改成功!');
        this.companyRoleService.searchCompanyRole();
        this.bsModalRef.hide();
      }
    }, 'www');
  }
}
