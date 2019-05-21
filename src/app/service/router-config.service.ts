import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RouterConfigService {
  public routersArr: any = [
    { path: "company-manage", loadChildren: "./modules/company-manage/company-manage.module#CompanyManageModule" },//企业管理-系统设置
    { path: "companyRole-manage", loadChildren: "./modules/company-role-manage/company-role-manage.module#CompanyRoleManageModule" },//企业角色管理-系统设置
    { path: "staff-manage", loadChildren: "./modules/staff-manage/staff-manage.module#StaffManageModule" },//员工管理-系统设置
    { path: "staffRole-manage", loadChildren: "./modules/staff-role-manage/staff-role-manage.module#StaffRoleManageModule" },//员工角色管理-系统设置
    { path: "inbound-manage", loadChildren: "./modules/into-stock-manage/into-stock-manage.module#IntoStockManageModule" },//运营方入库管理-仓库设置
    { path: "outbound-manage", loadChildren: "./modules/out-stock-manage/out-stock-manage.module#OutStockManageModule" },//运营方出库管理-仓库设置
    { path: "stock-manage", loadChildren: "./modules/stock-manage/stock-manage.module#StockManageModule" },//仓库管理-业务设置
    { path: "location-manage", loadChildren: "./modules/location-manage/location-manage.module#LocationManageModule" },//库位管理-业务设置
    { path: "goods-manage", loadChildren: "./modules/goods-manage/goods-manage.module#GoodsManageModule" },//货物品名管理
    { path: "unitType-manage", loadChildren: "./modules/priceunit-type-manage/priceunit-type-manage.module#PriceunitTypeManageModule" },//单位类型管理
    { path: "unit-manage", loadChildren: "./modules/priceunit-manage/priceunit-manage.module#PriceunitManageModule" },//单位管理
    { path: "lease-warehouse-manage", loadChildren: "./modules/lease-warehouse-manage/lease-warehouse-manage.module#LeaseWarehouseManageModule" },//租赁方库存管理
    { path: "opt-warehouse-manage", loadChildren: "./modules/opt-warehouse-manage/opt-warehouse-manage.module#OptWarehouseManageModule" },//运营方库存管理
    { path: "lease-inprereport-manage", loadChildren: "./modules/lease-insert-prereport/lease-insert-prereport.module#LeaseInsertPrereportModule" },//租赁方预报入库
    { path: "lease-outprereport-manage", loadChildren: "./modules/lease-out-prereport/lease-out-prereport.module#LeaseOutPrereportModule" },//租赁方预报出库
    { path: "opt-inprereport-manage", loadChildren: "./modules/opt-insert-prereport/opt-insert-prereport.module#OptInsertPrereportModule" },//运营预报入库
    { path: "opt-outprereport-manage", loadChildren: "./modules/opt-out-prereport/opt-out-prereport.module#OptOutPrereportModule" },//运营预报出库
    { path: "settlement-manage", loadChildren: "./modules/settlement/settlement.module#SettlementModule" },//月结金额结算管理
    { path: "statistic-manage", loadChildren: "./modules/statistic-manage/statistic-manage.module#StatisticManageModule" }//司机配送管理
  ];
  constructor() {
  }
}
