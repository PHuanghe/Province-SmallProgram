import Model from '../common/model'
export default class Goods extends Model {
  // 获取首页规格列表
  list(page, callback) {
    this.request({
      url: 'Service/Terminal/indexGoodsSpec',
      params: {
        page: page
      },
      callback: callback
    });
  }
  // 获取商城规格列表
  shoppingmall(page,callback) {
    this.request({
      url:'Service/Terminal/goodsSpec',
      params:{
        page:page
      },
      callback: callback
    });
  }
  // 获取详情
  details(id, callback) {
    this.request({
      url: 'Service/Terminal/goodsSpecDetails',
      params: {
        id: id
      },
      callback: callback
    });
  }
  // 保存和编辑收货人地址
  xintian(odj, callback) {
    this.request({
      url: 'Service/Terminal/setAddressInfo',
      method:"GET",
      params: {
        id: odj.id,
        uid: odj.uid,
        name: odj.name,
        phone: odj.phone,
        address: odj.address,
        default: odj.defaultl,
        province: odj.province,
        city: odj.city,
        county: odj.county,
      },
      callback: callback
    });
  }
  // 获取收货人地址
  receivingaddress(uid, callback) {
    this.request({
      url: 'Service/Terminal/getAddressInfo',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 获取单条编辑收货人地址
  singleeditor(data, callback) {
    this.request({
      url: 'Service/Terminal/getAddressInfoById',
      params: {
        id: data.id,
        uid: data.uid
      },
      callback: callback
    });
  }
  // 删除单条收货人地址
  deletes(id, callback) {
    this.request({
      url: 'Service/Terminal/delAddressInfo',
      params: {
        id: id,
      },
      callback: callback
    });
  }
  // 收货人地址设置默认
  setdefault(data, callback) {
    this.request({
      url: 'Service/Terminal/setDefaultAddress',
      params: {
        id: data.id,
        uid: data.uid
      },
      callback: callback
    });
  }
  // 收货人地址默认
  defaultselection(data, callback) {
    this.request({
      url: 'Service/Terminal/getDefaultAddress',
      params: {
        uid: data
      },
      callback: callback
    });
  }

}
