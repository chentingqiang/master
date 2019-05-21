import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../../../service/http.service';
import { PriceunitTypeService } from '../../../../service/priceunit-type.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AddPriceuintTypeComponent } from '../priceunit-type-manage/add-priceuint-type/add-priceuint-type.component';
import { EditPriceuintTypeComponent } from '../priceunit-type-manage/edit-priceuint-type/edit-priceuint-type.component';
@Component({
  selector: 'app-priceunit-type-manage',
  templateUrl: './priceunit-type-manage.component.html',
  styleUrls: ['./priceunit-type-manage.component.css'],
  providers: [BsModalRef]
})
export class PriceunitTypeManageComponent implements OnInit {
  priceUnitName: any = '';//单位名称
  allpriceUnitTypesList: any[] = [];
  constructor(
    private http: HttpService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    public bsModalRef1: BsModalRef,
    public priceunitTypeService : PriceunitTypeService,
    private message : NzMessageService
  ) { }

  ngOnInit() {
    this.searchPriceUnitType();
  }
  addPriceUnitType() {
    const initialState = {
    };
    this.bsModalRef = this.modalService.show(
      AddPriceuintTypeComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  searchPriceUnitType() {
    this.priceunitTypeService.searchPriceUnitType();
  }
  editPriceUnitType(obj: any) {
    const initialState = {
      list: obj
    };
    this.bsModalRef = this.modalService.show(
      EditPriceuintTypeComponent,
      Object.assign({ initialState }, { ignoreBackdropClick: true })
    );
  }
  //确认删除
  deletePriceUnitType(id): void {
    this.http.get('/ApolloManagement/unitType/deleteUnitType', { id: id }, res => {
      if (res.meta.success == true) {
        this.message.success('删除成功');
        this.searchPriceUnitType();
      }
    });
  }
}
