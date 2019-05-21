import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

//
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
//模块
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//服务
import { HttpService } from './service/http.service';
// import { InterceptorService } from './service/interceptor.service';
// import { CommonService } from './service/common.service';
// import { CompanyRoleService } from './service/company-role.service';
// import { GoodsService } from './service/goods.service';
// import { IntoStockService } from './service/into-stock.service';
// import { LeasePrereportService } from './service/lease-prereport.service';
// import { LocationService } from './service/location.service';
// import { OptPrereportService } from './service/opt-prereport.service';
// import { OutStockService } from './service/out-stock.service';
// import { PriceunitTypeService } from './service/priceunit-type.service';
// import { PriceunitService } from './service/priceunit.service';
// import { StaffRoleService } from './service/staff-role.service';
// import { StaffService } from './service/staff.service';
// import { StockService } from './service/stock.service';
// import { RouteguardService } from './routeguard.service';
//组件
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/admin/footer/footer.component';
// import { HeaderComponent } from './components/admin/header/header.component';
import { LeftSideComponent } from './components/admin/left-side/left-side.component';

import { LoginComponent } from './components/login/login.component';//登录
import { StartComponent } from './components/admin/pages/start/start.component';

// import { CompanyManageComponent } from './components/admin/pages/company-manage/company-manage.component';//企业管理
import { AddCompanyComponent } from './components/admin/pages/company-manage/add-company/add-company.component';
import { EditCompanyComponent } from './components/admin/pages/company-manage/edit-company/edit-company.component';
import { ViewCompanyComponent } from './components/admin/pages/company-manage/view-company/view-company.component';

// import { CompanyRoleManageComponent } from './components/admin/pages/company-role-manage/company-role-manage.component';//企业角色管理
import { AddCompanyRoleComponent } from './components/admin/pages/company-role-manage/add-company-role/add-company-role.component';
import { EditCompanyRoleComponent } from './components/admin/pages/company-role-manage/edit-company-role/edit-company-role.component';
import { AuthCompanyRoleComponent } from './components/admin/pages/company-role-manage/auth-company-role/auth-company-role.component';

// import { StaffManageComponent } from './components/admin/pages/staff-manage/staff-manage.component';//员工管理
import { AddStaffComponent } from './components/admin/pages/staff-manage/add-staff/add-staff.component';
import { EditStaffComponent } from './components/admin/pages/staff-manage/edit-staff/edit-staff.component';
import { ViewStaffComponent } from './components/admin/pages/staff-manage/view-staff/view-staff.component';
import { EditpassStaffComponent } from './components/admin/pages/staff-manage/editpass-staff/editpass-staff.component';

// import { StaffRoleManageComponent } from './components/admin/pages/staff-role-manage/staff-role-manage.component';//员工角色管理
import { AddStaffRoleComponent } from './components/admin/pages/staff-role-manage/add-staff-role/add-staff-role.component';
import { AuthStaffRoleComponent } from './components/admin/pages/staff-role-manage/auth-staff-role/auth-staff-role.component';
import { EditStaffRoleComponent } from './components/admin/pages/staff-role-manage/edit-staff-role/edit-staff-role.component';


// import { StockManageComponent } from './components/admin/pages/stock-manage/stock-manage.component';//仓库管理
import { AddStockComponent } from './components/admin/pages/stock-manage/add-stock/add-stock.component';
import { EditStockComponent } from './components/admin/pages/stock-manage/edit-stock/edit-stock.component';

// import { IntoStockManageComponent } from './components/admin/pages/into-stock-manage/into-stock-manage.component';//入库管理
import { ViewInstockComponent } from './components/admin/pages/into-stock-manage/view-instock/view-instock.component';

// import { OutStockManageComponent } from './components/admin/pages/out-stock-manage/out-stock-manage.component';//出库管理
import { ViewOutstockComponent } from './components/admin/pages/out-stock-manage/view-outstock/view-outstock.component';

// import { LocationManageComponent } from './components/admin/pages/location-manage/location-manage.component';//库位管理
import { AddLocationComponent } from './components/admin/pages/location-manage/add-location/add-location.component';
import { EditLocationComponent } from './components/admin/pages/location-manage/edit-location/edit-location.component';
import { RenewalStockComponent } from './components/admin/pages/stock-manage/renewal-stock/renewal-stock.component';

// import { GoodsManageComponent } from './components/admin/pages/goods-manage/goods-manage.component';//货物品名管理
import { EditGoodsComponent } from './components/admin/pages/goods-manage/edit-goods/edit-goods.component';
import { AddGoodsComponent } from './components/admin/pages/goods-manage/add-goods/add-goods.component';

// import { PriceunitManageComponent } from './components/admin/pages/priceunit-manage/priceunit-manage.component';//单位管理
import { AddPriceunitComponent } from './components/admin/pages/priceunit-manage/add-priceunit/add-priceunit.component';
import { EditPriceunitComponent } from './components/admin/pages/priceunit-manage/edit-priceunit/edit-priceunit.component';

// import { PriceunitTypeManageComponent } from './components/admin/pages/priceunit-type-manage/priceunit-type-manage.component';//单位类型管理
import { AddPriceuintTypeComponent } from './components/admin/pages/priceunit-type-manage/add-priceuint-type/add-priceuint-type.component';
import { EditPriceuintTypeComponent } from './components/admin/pages/priceunit-type-manage/edit-priceuint-type/edit-priceuint-type.component';
// import { LeaseWarehouseManageComponent } from './components/admin/pages/lease-warehouse-manage/lease-warehouse-manage.component';//租赁方库存管理
// import { OptWarehouseManageComponent } from './components/admin/pages/opt-warehouse-manage/opt-warehouse-manage.component';
// import { LeaseInsertPrereportComponent } from './components/admin/pages/lease-insert-prereport/lease-insert-prereport.component';//租赁入库预报
import { AddLeaseInsertPrereportComponent } from './components/admin/pages/lease-insert-prereport/add-lease-insert-prereport/add-lease-insert-prereport.component';
import { ViewLeaseInsertPrereportComponent } from './components/admin/pages/lease-insert-prereport/view-lease-insert-prereport/view-lease-insert-prereport.component';
// import { LeaseOutPrereportComponent } from './components/admin/pages/lease-out-prereport/lease-out-prereport.component';//租赁出库预报
import { AddLeaseOutPrereportComponent } from './components/admin/pages/lease-out-prereport/add-lease-out-prereport/add-lease-out-prereport.component';
import { ViewLeaseOutPrereportComponent } from './components/admin/pages/lease-out-prereport/view-lease-out-prereport/view-lease-out-prereport.component';
// import { OptOutPrereportComponent } from './components/admin/pages/opt-out-prereport/opt-out-prereport.component';//运营出库预报
// import { OptInsertPrereportComponent } from './components/admin/pages/opt-insert-prereport/opt-insert-prereport.component';//运营入库预报
import { OptInstockPrereportComponent } from './components/admin/pages/opt-insert-prereport/opt-instock-prereport/opt-instock-prereport.component';
// import { OptInsertPrereportService } from './service/opt-insert-prereport.service';
// import { OptOutPrereportService } from './service/opt-out-prereport.service';
// import { LeaseInsertPrereportService } from './service/lease-insert-prereport.service';
// import { LeaseOutPrereportService } from './service/lease-out-prereport.service';
import { PublicService } from './service/public.service';
import { OptOutstockPrereportComponent } from './components/admin/pages/opt-out-prereport/opt-outstock-prereport/opt-outstock-prereport.component';
import { Load } from './service/load';
import { ViewOptOutPrereportComponent } from './components/admin/pages/opt-out-prereport/view-opt-out-prereport/view-opt-out-prereport.component';
import { DeliverGoodsComponent } from './components/admin/pages/out-stock-manage/deliver-goods/deliver-goods.component';
import { ModalComponent } from './components/admin/pages/modal/modal.component';
import { CheckBoxService } from './service/check-box.service';
import { CoockiesService } from './service/coockies.service';
import { RouterConfigService } from './service/router-config.service';
import { ToSettleComponent } from './components/admin/pages/settlement/to-settle/to-settle.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    // HeaderComponent,
    LeftSideComponent,
    LoginComponent,
    // CompanyManageComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ViewCompanyComponent,
    StartComponent,
    // CompanyRoleManageComponent,
    AddCompanyRoleComponent,
    EditCompanyRoleComponent,
    AuthCompanyRoleComponent,
    // StaffManageComponent,
    // StaffRoleManageComponent,
    AddStaffComponent,
    EditStaffComponent,
    ViewStaffComponent,
    EditpassStaffComponent,
    AddStaffRoleComponent,
    AuthStaffRoleComponent,
    EditStaffRoleComponent,
    // IntoStockManageComponent,
    ViewInstockComponent,
    OptInstockPrereportComponent,
    ViewOutstockComponent,
    // LocationManageComponent,
    EditLocationComponent,
    AddLocationComponent,
    RenewalStockComponent,
    // GoodsManageComponent,
    AddGoodsComponent,
    // PriceunitTypeManageComponent,
    // PriceunitManageComponent,
    AddPriceunitComponent,
    EditPriceunitComponent,
    AddPriceuintTypeComponent,
    EditPriceuintTypeComponent,
    EditGoodsComponent,
    // StockManageComponent,
    AddStockComponent,
    EditStockComponent,
    // OutStockManageComponent,
    // PriceunitTypeManageComponent,
    // PriceunitManageComponent,
    // LeaseWarehouseManageComponent,
    // OptWarehouseManageComponent,
    // LeaseInsertPrereportComponent,
    AddLeaseInsertPrereportComponent,
    ViewLeaseInsertPrereportComponent,
    // LeaseOutPrereportComponent,
    AddLeaseOutPrereportComponent,
    ViewLeaseOutPrereportComponent,
    // OptOutPrereportComponent,
    // OptInsertPrereportComponent,
    OptOutstockPrereportComponent,
    ViewOptOutPrereportComponent,
    DeliverGoodsComponent,
    ModalComponent,
    ToSettleComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule
  ],
  entryComponents: [
    EditCompanyComponent,
    ViewCompanyComponent,
    AddCompanyComponent,
    AddCompanyRoleComponent,
    EditCompanyRoleComponent,
    AuthCompanyRoleComponent,
    AddStaffComponent,
    EditStaffComponent,
    ViewStaffComponent,
    EditpassStaffComponent,
    AddStaffRoleComponent,
    AuthStaffRoleComponent,
    EditStaffRoleComponent,
    ViewInstockComponent,
    OptInstockPrereportComponent,
    ViewOutstockComponent,
    EditLocationComponent,
    AddLocationComponent,
    RenewalStockComponent,
    AddStockComponent,
    EditStockComponent,
    // LocationManageComponent,
    StartComponent,
    // CompanyManageComponent,
    // CompanyRoleManageComponent,
    // StaffManageComponent,
    // StaffRoleManageComponent,
    // IntoStockManageComponent,
    // StockManageComponent,
    // OutStockManageComponent,
    AddGoodsComponent,
    EditGoodsComponent,
    // GoodsManageComponent,
    // PriceunitTypeManageComponent,
    // PriceunitManageComponent,
    AddPriceuintTypeComponent,
    EditPriceuintTypeComponent,
    AddPriceunitComponent,
    EditPriceunitComponent,
    // LeaseWarehouseManageComponent,
    // OptWarehouseManageComponent,
    // LeaseInsertPrereportComponent,
    AddLeaseInsertPrereportComponent,
    ViewLeaseInsertPrereportComponent,
    // LeaseOutPrereportComponent,
    AddLeaseOutPrereportComponent,
    ViewLeaseOutPrereportComponent,
    // OptOutPrereportComponent,
    // OptInsertPrereportComponent,
    OptOutstockPrereportComponent,
    ViewOptOutPrereportComponent,
    DeliverGoodsComponent,
    ToSettleComponent
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi:true },
    Load,
    HttpService,
    PublicService,
    // CommonService,
    // CompanyRoleService,
    // GoodsService,
    // IntoStockService,
    // RouteguardService,
    // LeasePrereportService,
    // LocationService,
    // OptPrereportService,
    // OutStockService,
    // PriceunitTypeService,
    // PriceunitService,
    // StaffRoleService,
    // StaffService,
    // StockService,
    // OptInsertPrereportService,
    // OptOutPrereportService,
    // LeaseInsertPrereportService,
    // LeaseOutPrereportService,
    CheckBoxService,
    CoockiesService,
    RouterConfigService,
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }