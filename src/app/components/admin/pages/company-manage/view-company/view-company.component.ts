import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../service/common.service';
import { PublicService } from '../../../../../service/public.service';
@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  list: any;
  companyRoleId:any = '';
  optMap:any = new Map<string,string>();
  constructor(public commonService: CommonService, public bsModalRef: BsModalRef,public publicService:PublicService) { }
  ngOnInit() {
    console.log(this.list);
    this.publicService.getOptList((datas,maps)=>{
      this.optMap = maps;
    })
  }
}
