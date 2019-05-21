import { Component, OnInit ,TemplateRef,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public isCollapsed:boolean = false;
  triggerTemplate: TemplateRef<void> | null = null;
  // @ViewChild('trigger') customTrigger: TemplateRef<void>;
  // public imgUrl: string = './assets/img/user.jpg';
  public imgUrl: string = './assets/logo/banma-logo-180-180.png';
  public username: any = '';
  menus:any[] = [];
  constructor(private router: Router,private http:HttpService) { 
    console.log('当前路由',this.router.config);
  }
  // changeTrigger(): void {
  //   this.triggerTemplate = this.customTrigger;
  // }
  ngOnInit() {
    if (sessionStorage.getItem('user') != null) {
      this.username = JSON.parse(sessionStorage.getItem('user')).name;
    }else{
      this.router.navigate(['/lease-login']);
    }
    if (sessionStorage.getItem('menu') != null) {
      var menu = JSON.parse(sessionStorage.getItem('menu'));
      this.editMenu(menu);
      // console.log(menu);
      this.menus = menu;
    }
  }
  editMenu(arr){
    for(let i=0;i<arr.length;i++){
      if(arr[i].parentId == 0){
        arr[i].level = 1;
        this.setBars(arr[i]);
      }else{
        arr[i].level = 2;
      }
      if(arr[i].childMenus.length != 0){
        this.editMenu(arr[i].childMenus);
      }else{
        delete arr[i].childMenus;
      }
    }
  }
  setBars(item){
    if(item.menuName == '系统设置'){
      item.icon = 'setting';
    }else if(item.menuName == '业务设置'){
      item.icon = 'audit';
    }else if(item.menuName == '仓库设置'){
      item.icon = 'shop';
    }else if(item.menuName == '财务管理'){
      item.icon = 'dollar';
    }else{
      item.icon = 'bars';
    }
  }
  loginOut() {
    this.http.get("/ApolloManagement/login/loginOut", false, res => {
      if (res.meta.success == true) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("menu");
        sessionStorage.removeItem("routerConfig");
        this.router.navigate(['/lease-login']);
      }
    })
  }
}
