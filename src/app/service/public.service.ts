import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable()
export class PublicService {
  constructor(private http: HttpService) { }
  //是否为运营公司
  getOptList(back) {
    let optList: any = [
      { id: 1, name: "是" },
      { id: 2, name: "否" }
    ];
    let maps = new Map<string, string>();
    for (let i = 0; i < optList.length; i++) {
      maps.set(optList[i].id, optList[i].name);//name
    }
    back(optList, maps);
  }
  //获取企业角色
  getRoleList(back): any {
    //获取所有企业角色
    this.http.post('/ApolloManagement/companyRole/findCompanyRole', {}, res => {
      if (res.meta.success == true) {
        back(res.data)
      }
    }, 'json');
  }
  //获取省份
  getProvince(back): any {
    //设置省份
    if (sessionStorage.getItem('province') == null) {
      this.http.get('/ApolloManagement/area/getAreas', { 'level': 1, 'parentId': -1 }, resp => {
        sessionStorage.setItem("province", JSON.stringify(resp.data));
        let maps = new Map<number, string>();
        for (let i = 0; i < resp.data.length; i++) {
          maps.set(resp.data[i].areaid, resp.data[i].areaname);//areaname
        }
        back(resp.data,maps)
      });
    } else {
      //缓存读取省份
      let province = JSON.parse(sessionStorage.getItem('province'));
      let maps = new Map<number, string>();
      for (let i = 0; i < province.length; i++) {
        maps.set(province[i].areaid, province[i].areaname);//areaname
      }
      back(province,maps);
    }
  }
  //选择省份获取市县
  getCity(parentId, back) {
    if (parentId != null || parentId != '') {
      this.http.get('/ApolloManagement/area/getAreas', { 'level': 2, 'parentId': parentId }, resp => {
        back(resp.data);
      });
    }
  }
  //获取所有仓库
  getStockList(back): any {
    this.http.post('/ApolloManagement/warehouse/getWarehouse', {}, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, any>();
        let maps1 = new Map<string, any>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i]);
          maps1.set(res.data[i].id, res.data[i].name);
        }
        back(res.data, maps,maps1);
      }
    }, 'www');
  }
  //获取所有仓库(name)
  getStockListByName(back): any {
    this.http.post('/ApolloManagement/warehouse/getWarehouse', {}, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i].name);
        }
        back(res.data, maps);
      }
    }, 'www');
  }
  //获取所有库位
  getAllLocation(back) {
    this.http.post('/ApolloManagement/location/findLocation', {}, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i].warehouseLocationName);
        }
        back(res.data, maps);
      }
    }, "json");
  }
  //根据公司获取公司拥有的仓库
  getCompanyWarehouse(back) {
    if (sessionStorage.getItem('user')) {
      var cid = JSON.parse(sessionStorage.getItem('user')).companyId;
      this.http.post('/ApolloManagement/warehouse/getCompanyWarehouse', { companyId: cid }, res => {
        if (res.meta.success == true) {
          let maps = new Map<string, string>();
          for (let i = 0; i < res.data.length; i++) {
            maps.set(res.data[i].id, res.data[i].name);
          }
          back(res.data, maps);
        }
      }, 'www');
    }
  }
  //获取所有公司
  getAllCompany(back) {
    this.http.get('/ApolloManagement/company/getAllCompany', false, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i].companyName);
        }
        back(res.data, maps);
      }
    });
  }
  //获取运营公司
  getOperatorCompany(back) {
    this.http.get('/ApolloManagement/company/getOperatorCompany', false, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i].companyName);
        }
        back(res.data, maps);
      }
    });
  }
  //获取公司所拥有的角色
  getCompanyRole(companyId, back) {
    this.http.post('/ApolloManagement/companyRole/getCompanyRole', { companyId: companyId }, res => {
      let map = new Map<string, string>();
      for (let i = 0; i < res.data.length; i++) {
        map.set(res.data[i].id, res.data[i].companyRoleName);
      }
      back(res.data, map);
    }, 'www');
  }
  //获取所有货物
  getCargoList(back) {
    this.http.get('/ApolloManagement/cargo/getCargoList', false, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i]);
        }
        back(res.data, maps);
      }
    });
  }
  //根据orderId获取入库货物清单
  getWareHouseList(orderId, instorageId, back) {
    let instorageIds = instorageId == null ? "" : instorageId;
    this.http.post('/ApolloManagement/prereportIn/getReportCargo', { orderId: orderId, instorageId: instorageIds }, res => {
      if (res.meta.success == true) {
        let instorageCargoList = res.data.instorageCargo == null ? [] : res.data.instorageCargo
        back(res.data.reportCargo, instorageCargoList);
      }
    }, 'www');
  }
  //根据仓库获取库位
  getLocationId(warehouseId, back) {
    this.http.post('/ApolloManagement/location/getLocation', { "warehouseId": warehouseId }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i].warehouseLocationName);//warehouseLocationName
        }
        back(res.data, maps);
      }
    }, 'www');
  }
  //获取出入库管理状态(预报出库)
  getStatus(back) {
    let statusList: any = [
      { id: 1, name: "待审核" },
      { id: 2, name: "待出货" },
      { id: 3, name: "已完成" }
    ];
    let maps = new Map<string, string>();
    for (let i = 0; i < statusList.length; i++) {
      maps.set(statusList[i].id, statusList[i].name);//name
    }
    back(statusList, maps);
  }
  //获取预报入库状态
  getPreStatus(back) {
    let statusList: any = [
      { id: 1, name: "未完成" },
      { id: 2, name: "已完成" }
    ];
    let maps = new Map<string, string>();
    for (let i = 0; i < statusList.length; i++) {
      maps.set(statusList[i].id, statusList[i].name);//name
    }
    back(statusList, maps);
  }
  //获取结算状态
  getSettleStatus(back) {
    let statusList: any = [
      { id: 1, name: "未支付" },
      { id: 2, name: "已支付" }
    ];
    let maps = new Map<string, string>();
    for (let i = 0; i < statusList.length; i++) {
      maps.set(statusList[i].id, statusList[i].name);//name
    }
    back(statusList, maps);
  }
  //获取出库状态
  getOutStatus(back) {
    let statusList: any = [
      { id: 1, name: "备货中" },
      { id: 2, name: "已发货" },
      { id: 3, name: "已完成" }
    ];
    let maps = new Map<string, string>();
    for (let i = 0; i < statusList.length; i++) {
      maps.set(statusList[i].id, statusList[i].name);//name
    }
    back(statusList, maps);
  }
  //获取提货方式
  getDeliverType(back) {
    let deliverTypeList: any = [
      { id: 1, name: '自提' },
      { id: 2, name: '配送' }
    ];
    let maps = new Map<string, string>();
    for (let i = 0; i < deliverTypeList.length; i++) {
      maps.set(deliverTypeList[i].id, deliverTypeList[i].name);//name
    }
    back(deliverTypeList, maps);
  }
  //获取司机
  getDrivers(back) {
    this.http.post('/ApolloManagement/user/findUser', { companyId: JSON.parse(sessionStorage.getItem('user')).companyId }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i]);//name
        }
        back(res.data, maps);
      }
    }, 'json');
    // let driverList: any = [
    //   { id: 1, name: '小李', telephone: '13123423468' },
    //   { id: 2, name: '小王', telephone: '15659654231' }
    // ];
    // let maps = new Map<string, string>();
    // for (let i = 0; i < driverList.length; i++) {
    //   maps.set(driverList[i].id, driverList[i]);
    // }
    // back(driverList, maps);
  }
  //获取包装规格单位
  getStandard(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 2 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);//name
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取计价单位
  getPriceUnit(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 3 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);//name
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取结算方式
  getVariablePayment(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 9 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);//name
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取库位类型
  getLocationTypeList(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 7 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);//name
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取所有货物类别
  getGoodsTypeList(back) {
    let goodsTypeList = [
      { id: 1, name: '红酒' },
      { id: 2, name: '啤酒' }
    ];
    let maps = new Map<number, string>();
    for (let i = 0; i < goodsTypeList.length; i++) {
      maps.set(goodsTypeList[i].id, goodsTypeList[i].name);
    }
    back(goodsTypeList, maps);
  }
  //获取货物产地列表
  getOriginPlaceList(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 4 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取代理商列表
  getAgentList(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 5 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取仓库类型
  getStockTypeList(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 6 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取厂家列表
  getProductionList(back) {
    this.http.post('/ApolloManagement/unit/findUnit', { typeId: 8 }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].code, res.data[i].name);
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取此运营公司操作员
  getOperator(back) {
    this.http.post('/ApolloManagement/user/findUser', { companyId: JSON.parse(sessionStorage.getItem('user')).companyId }, res => {
      if (res.meta.success == true) {
        let maps = new Map<string, string>();
        for (let i = 0; i < res.data.length; i++) {
          maps.set(res.data[i].id, res.data[i].name);//name
        }
        back(res.data, maps);
      }
    }, 'json');
  }
  //获取公司类型
  getCompanyType(back) {
    if (sessionStorage.getItem('user') != null) {
      this.http.get('/ApolloManagement/company/getCompanyType', { id: JSON.parse(sessionStorage.getItem('user')).companyId }, res => {
        if (res.meta.success == true) {
          back(res.data);
        }
      });
    }
  }
}