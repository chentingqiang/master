import { Component, OnInit } from '@angular/core';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../../service/http.service';
@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  roleMap: any;
  list:any;
  constructor(public bsModalRef : BsModalRef,private http : HttpService) { }

  ngOnInit() {
  }
}
