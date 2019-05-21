import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
  menulists: any[] = [];

  constructor() {
  }

  ngOnInit() {
    if (sessionStorage.getItem('menu') != null) {
      var menu = JSON.parse(sessionStorage.getItem('menu'));
      this.menulists = menu;
    }
  }
}
