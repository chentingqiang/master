import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { Load } from '../../../../service/load';
import { PriceunitService } from '../../../../service/priceunit.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AddPriceunitComponent } from '../priceunit-manage/add-priceunit/add-priceunit.component';
import { EditPriceunitComponent } from '../priceunit-manage/edit-priceunit/edit-priceunit.component';

@Component({
  selector: 'app-priceunit-manage',
  templateUrl: './priceunit-manage.component.html',
  styleUrls: ['./priceunit-manage.component.css'],
  providers: [BsModalRef]
})
export class PriceunitManageComponent implements OnInit {
  idx: any;
  priceUnitTypeList: any[] = [];
  priceUnitTypeMap: any = new Map<string, string>();
  loadedFlag: boolean = false;//数据加载完毕
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public bsModalRef1: BsModalRef,
    public priceunitService: PriceunitService,
    private message: NzMessageService,
    public load:Load
  ) { }

  ngOnInit() {
    this.load.loading15 = true;
    //获取单位类型
    this.getUnitType()
  }
  getUnitType() {
    this.http.post('/ApolloManagement/unitType/findUnitType', {}, res => {
      if (res.meta.success == true) {
        this.priceUnitTypeList = res.data;
        for (let i = 0; i < this.priceUnitTypeList.length; i++) {
          this.priceUnitTypeMap.set(this.priceUnitTypeList[i].id, this.priceUnitTypeList[i].typeName);
        }
        this.priceunitService.priceUnitTypeName = this.priceUnitTypeList[0].id;
        this.loadedFlag = true;
        this.priceunitService.searchPriceUnit();
      }
    }, 'json');
  }
  addPriceUnit() {
    const initialState = {
      priceUnitTypeList: this.priceUnitTypeList,
      loadedFlag:this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      AddPriceunitComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  searchPriceUnit() {
    this.priceunitService.searchPriceUnit();
  }
  editPriceUnit(obj: any) {
    const initialState = {
      list: obj,
      priceUnitTypeList: this.priceUnitTypeList,
      priceUnitTypeMap: this.priceUnitTypeMap,
      loadedFlag:this.loadedFlag
    };
    this.bsModalRef = this.modalService.show(
      EditPriceunitComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  //确认删除
  deletePriceUnit(id): void {
    this.http.get('/ApolloManagement/unit/deleteUnit', { id: id }, res => {
      if (res.meta.success == true) {
        this.message.success('删除成功！');
        this.priceunitService.searchPriceUnit();
      }
    });
  }
}
