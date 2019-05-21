import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeComponent, NzMessageService } from 'ng-zorro-antd';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
import { StaffRoleService } from '../../../../../service/staff-role.service';
@Component({
  selector: 'app-auth-staff-role',
  templateUrl: './auth-staff-role.component.html',
  styleUrls: ['./auth-staff-role.component.css']
})
export class AuthStaffRoleComponent implements OnInit {
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  list: any;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, public staffRoleService: StaffRoleService,
    private message: NzMessageService) { }
  defaultCheckedKeys = [];
  defaultCheckedKey = [];
  nodes: any = [];
  nodeList: any[] = [];
  loadedFlag:boolean = false;
  ngOnInit() {
    console.log(this.list);
    //获取company菜单
    this.http.get('/ApolloManagement/menu/getCompanyMenuList', { companyId: JSON.parse(sessionStorage.getItem('user')).companyId }, res => {
      if (res.meta.success == true) {
        // this.addchecked(res.data);//增加指示位
        for (let i = 0; i < res.data.length; i++) {
          this.nodes.push({ id: res.data[i].id, title: res.data[i].menuName, key: res.data[i].id, children: [] });
          for (let j = 0; j < res.data[i].childMenus.length; j++) {
            this.nodes[i].children.push({ id: res.data[i].childMenus[j].id, title: res.data[i].childMenus[j].menuName, key: res.data[i].childMenus[j].id, children: [] });
          }
        }
        this.nodeList = this.nodes;
        //角色菜单
        if (this.list.menuId != null) {
          var menuarr = this.list.menuId.split(',');
          this.forLists(res.data, menuarr);
          this.defaultCheckedKeys = this.defaultCheckedKey;
        }
        this.loadedFlag = true;
      }
    });
  }
  //递归赋值
  forLists(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j] == arr1[i].id) {
          arr1[i].checked = true;
          this.defaultCheckedKey.push(arr1[i].id);
        }
      }
      if (arr1[i].childMenus.length > 0) {
        this.forLists(arr1[i].childMenus, arr2);
      }
    }
  }
  authStaffRole() {
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
    var data =
    {
      'menuId': arr2.join(','),
      'roleId': this.list.id
    };
    console.log(data);
    this.http.post('/ApolloManagement/userRole/powerMenus', data, res => {
      if (res.meta.success == true) {
        // alert('修改成功');
        this.message.success('修改成功！');
        this.staffRoleService.searchRole();
        this.bsModalRef.hide();
      } else {
        alert(res.meta.message);
      }
    }, 'www');
  }
}
