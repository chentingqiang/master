import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { RouterConfigService } from './service/router-config.service';

import { AdminComponent } from './components/admin/admin.component';
import { StartComponent } from './components/admin/pages/start/start.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: '', redirectTo: 'lease-login', pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: StartComponent, data: { breadcrumb: '首页' } },

      { path: "company-manage", loadChildren: "./modules/company-manage/company-manage.module#CompanyManageModule", data: { breadcrumb: '企业管理' } },//企业管理-系统设置
      { path: "companyRole-manage", loadChildren: "./modules/company-role-manage/company-role-manage.module#CompanyRoleManageModule", data: { breadcrumb: '企业角色管理' } },//企业角色管理-系统设置
      { path: "staff-manage", loadChildren: "./modules/staff-manage/staff-manage.module#StaffManageModule", data: { breadcrumb: '员工管理' } },//员工管理-系统设置
      { path: "staffRole-manage", loadChildren: "./modules/staff-role-manage/staff-role-manage.module#StaffRoleManageModule", data: { breadcrumb: '员工角色管理' } },//员工角色管理-系统设置
      { path: "inbound-manage", loadChildren: "./modules/into-stock-manage/into-stock-manage.module#IntoStockManageModule", data: { breadcrumb: '运营方入库管理' } },//运营方入库管理-仓库设置
      { path: "outbound-manage", loadChildren: "./modules/out-stock-manage/out-stock-manage.module#OutStockManageModule", data: { breadcrumb: '运营方出库管理' } },//运营方出库管理-仓库设置
      { path: "stock-manage", loadChildren: "./modules/stock-manage/stock-manage.module#StockManageModule", data: { breadcrumb: '仓库管理' } },//仓库管理-业务设置
      { path: "location-manage", loadChildren: "./modules/location-manage/location-manage.module#LocationManageModule", data: { breadcrumb: '库位管理' } },//库位管理-业务设置
      { path: "goods-manage", loadChildren: "./modules/goods-manage/goods-manage.module#GoodsManageModule", data: { breadcrumb: '货物品名管理' } },//货物品名管理
      { path: "unitType-manage", loadChildren: "./modules/priceunit-type-manage/priceunit-type-manage.module#PriceunitTypeManageModule", data: { breadcrumb: '单位类型管理' } },//单位类型管理
      { path: "unit-manage", loadChildren: "./modules/priceunit-manage/priceunit-manage.module#PriceunitManageModule", data: { breadcrumb: '单位管理' } },//单位管理
      { path: "lease-warehouse-manage", loadChildren: "./modules/lease-warehouse-manage/lease-warehouse-manage.module#LeaseWarehouseManageModule", data: { breadcrumb: '租赁方库存管理' } },//租赁方库存管理
      { path: "opt-warehouse-manage", loadChildren: "./modules/opt-warehouse-manage/opt-warehouse-manage.module#OptWarehouseManageModule", data: { breadcrumb: '运营方库存管理' } },//运营方库存管理
      { path: "lease-inprereport-manage", loadChildren: "./modules/lease-insert-prereport/lease-insert-prereport.module#LeaseInsertPrereportModule", data: { breadcrumb: '租赁方预报入库' } },//租赁方预报入库
      { path: "lease-outprereport-manage", loadChildren: "./modules/lease-out-prereport/lease-out-prereport.module#LeaseOutPrereportModule", data: { breadcrumb: '租赁方预报出库' } },//租赁方预报出库
      { path: "opt-inprereport-manage", loadChildren: "./modules/opt-insert-prereport/opt-insert-prereport.module#OptInsertPrereportModule", data: { breadcrumb: '运营预报入库' } },//运营预报入库
      { path: "opt-outprereport-manage", loadChildren: "./modules/opt-out-prereport/opt-out-prereport.module#OptOutPrereportModule", data: { breadcrumb: '运营预报出库' } },//运营预报出库
      { path: "settlement-manage", loadChildren: "./modules/settlement/settlement.module#SettlementModule", data: { breadcrumb: '月结金额结算管理' } },//月结金额结算管理
      { path: "statistic-manage", loadChildren: "./modules/statistic-manage/statistic-manage.module#StatisticManageModule", data: { breadcrumb: '配送统计管理' } },//配送统计管理

      { path: '**', redirectTo: 'start', pathMatch: 'full' }
    ]
  },
  { path: 'lease-login', component: LoginComponent },
  { path: '**', redirectTo: 'lease-login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(public router: Router, public routerConfigService: RouterConfigService) {
    // let componentList = this.routerConfigService.routersArr;
    // if (sessionStorage.getItem('routerConfig') != null) {
    //   var routerArr = JSON.parse(sessionStorage.getItem('routerConfig'));
    //   this.router.config[1].children = [];
    //   for (let j = 0; j < routerArr.length; j++) {
    //     for (let n = 0; n < componentList.length; n++) {
    //       if (routerArr[j].path == componentList[n].path) {
    //         // routes[1].children.push(componentList[n]);
    //         this.router.config[1].children.push(componentList[n]);
    //       }
    //     }
    //   }
    //   this.router.config[1].children.unshift({ path: '', redirectTo: 'start', pathMatch: 'full' }, { path: 'start', component: StartComponent });
    //   this.router.config[1].children.push({ path: '**', redirectTo: 'start', pathMatch: 'full' });
    //   this.router.resetConfig(this.router.config);
    //   console.log('动态配置路由', this.router.config);
    // } else {
    //   this.router.config[1].children = [];
    //   this.router.resetConfig(this.router.config);
    // }
  }
}
