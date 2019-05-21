import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../service/http.service';
import { PublicService } from '../../../../../service/public.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-instock',
  templateUrl: './view-instock.component.html',
  styleUrls: ['./view-instock.component.css']
})
export class ViewInstockComponent implements OnInit {
  previewVisible: boolean = false;
  cargoImageUrl: string = '';
  locationMap: any = new Map<string, string>();//库位map
  priceUnitMap: any = new Map<string, string>();//计价方式
  standardMap: any = new Map();//规格单位map
  variablePaymentMap: any = new Map<string, string>();//结算方式
  list: any;
  warehouseMap: any;
  companyMap: any;
  cargoMap: any;
  operatorMap: any;
  viewList: any = null;
  priceUnitIdList: any[] = [];//单位列表
  constructor(private http: HttpService, public bsModalRef: BsModalRef, private router: Router, public publicService: PublicService) { }

  ngOnInit() {
    console.log(this.list);
    //获取库位
    this.publicService.getLocationId(this.list.warehouseId, (datas, maps) => {
      this.locationMap = maps;
      //获取规格单位
      this.publicService.getStandard((datas, maps) => {
        this.standardMap = maps;
        //获取结算方式
        this.publicService.getVariablePayment((datas, maps) => {
          this.variablePaymentMap = maps;
          //获取计价方式
          this.publicService.getPriceUnit((datas, maps) => {
            this.priceUnitMap = maps;
            //获取入库详情表
            this.http.post('/ApolloManagement/inStorage/getInStorageInfo', { id: this.list.id }, res => {
              if (res.meta.success == true) {
                this.viewList = res.data;
              }
            }, 'www');
          });
        });
      });
    });
  }
  ngAfterViewInit(): void {

  }
  //预览商品图片
  preview(url) {
    this.cargoImageUrl = url;
    this.previewVisible = true;
  }
  //跳转至预报单查询
  toPrereport(number) {
    console.log(number);
    sessionStorage.setItem('optNumber', number);
    this.bsModalRef.hide();
    this.router.navigate(['/admin/opt-inprereport-manage']);
  }
}