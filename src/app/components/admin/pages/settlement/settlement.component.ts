import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { PublicService } from '../../../../service/public.service';
import { SettlementService } from '../../../../service/settlement.service';
import { ToSettleComponent } from '../settlement/to-settle/to-settle.component';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css'],
  providers: [BsModalRef]
})
export class SettlementComponent implements OnInit {
  paymentList:any[] = [];
  companyList: any[] = [];//all租赁公司
  stateList: any[] = [];//结算状态列表
  paymentMap: any = new Map<string, string>();
  companyMap: any = new Map<string, string>();
  stateMap: any = new Map<string, string>();
  constructor(public publicService: PublicService, public http: HttpService,
     public settlementService: SettlementService, public message: NzMessageService,
     private modalService: BsModalService,public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.publicService.getAllCompany((data, map) => {
      this.companyList = data;
      this.companyMap = map;
      this.publicService.getSettleStatus((data, map) => {
        this.stateList = data;
        this.stateMap = map;
        this.publicService.getVariablePayment((data, map) => {
          this.paymentList = data;
          this.paymentMap = map;
        });
      });
    });
  }
  search(){
    this.settlementService.search();
  }
  toPay(obj:any){
    const initialState = {
      list: obj,
      paymentList:this.paymentList,
      paymentMap: this.paymentMap,
      companyMap: this.companyMap,
      stateMap: this.stateMap
    };
    this.bsModalRef = this.modalService.show(
      ToSettleComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
}