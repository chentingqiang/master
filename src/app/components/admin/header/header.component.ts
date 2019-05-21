import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  breadcrumb: any[] = [];
  idx: any;
  breadcrumbMap: any = new Map();
  title:any = '';
  constructor(public router: Router) { }
  ngOnInit() {
    if (sessionStorage.getItem('menu') != null) {
      let menu = JSON.parse(sessionStorage.getItem('menu'));
      console.log(menu);
      var url = window.location.href; //
      // console.log(url);
      this.setBreadcrumb(menu, url);
      this.title = this.breadcrumb[this.breadcrumb.length - 1];
      // console.log(this.breadcrumb);
      // console.log(this.breadcrumbMap);
    }
  }
  setBreadcrumb(arr, url) {
    for (let i of arr) {
      if (i.parentId == 0) {
        this.breadcrumbMap.set(i.id, i.menuName);
        this.idx = i.id;
      }
      if (i.parentId != 0 && url.search(i.urlPath) != -1) {
        this.breadcrumb.push(this.breadcrumbMap.get(this.idx), i.menuName);
      }
      if (i.childMenus.length != 0) {
        this.setBreadcrumb(i.childMenus, url);
      }
    }
  }
}
