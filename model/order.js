// +----------------------------------------------------------------------
// | 广西西途比网络科技有限公司 www.c2b666.com
// +----------------------------------------------------------------------
// | 功能描述: 订单模型
// +----------------------------------------------------------------------
// | 时　　间: 2018
// +----------------------------------------------------------------------
// | 代码创建: 朱荻 <292018748@qq.com>
// +----------------------------------------------------------------------
// | 版本信息: V1.0.0
// +----------------------------------------------------------------------
// | 代码修改:（修改人 - 修改时间）
// +----------------------------------------------------------------------
import Model from '../common/model'
export default class Order extends Model {
  // 获取全部订单列表
  list(uid, page, callback) {
    this.request({
      url: 'Service/Terminal/wholeOrder',
      params: {
        uid: uid,
        page: page
      },
      callback: callback
    });
  }
  // 获取类型订单列表
  listType(uid, status, page, callback) {
    this.request({
      url: 'Service/Terminal/wholeOrder',
      params: {
        uid: uid,
        status: status,
        page: page
      },
      callback: callback
    });
  }
  // 获取订单详情
  details(oid, callback) {
    this.request({
      url: 'Service/Terminal/getOrderDetails',
      params: {
        oid: oid
      },
      callback: callback
    });
  }
  // 获取订单物流详情
  logistics(uid,oid, callback) {
    this.request({
      url: 'Service/Terminal/logistics',
      params: {
        uid: uid,
        oid: oid
      },
      callback(data) {
        data.result = data.result.reverse();
        if (typeof (callback) == 'function') {
          callback(data);
        }
      }
    });
  }  
  // 取消订单
  cancelOrder(uid,oid, callback) {
    this.request({
      url: 'Service/Terminal/cancelOrder',
      params: {
        uid:uid,
        oid: oid
      },
      callback:callback,
    });
  }  
  // 确认收货
  changeOrder(uid,oid, callback) {
    this.request({
      url: 'Service/Terminal/confirmOrderStatus',
      params: {
        uid:uid,
        oid: oid
      },
      callback:callback
    });
  }  
  // 确认已安装
  completed(uid, oid, callback) {
    this.request({
      url: 'Service/Terminal/completedOrderStatus',
      params: {
        uid: uid,
        oid: oid
      },
      callback: callback
    });
  }  
  // 下单接口
  submit(objectall, callback) {
    var dataall = {
      // 用户uid
      uid: objectall.uid,
      // 商品title
      title: objectall.title,
      // 价格
      price: objectall.price,
      // 商品id
      gid: objectall.gid,
      // 规格id
      specid: objectall.specid,
      // 规格产品图
      path: objectall.path,
      //属性id
      attribute_id: objectall.attribute_id,
      // 商品数量
      number: objectall.numberl,
      // 购买人
      buy_name: objectall.buy_name,
      // 电话
      buy_phone: objectall.buy_phone,
      // 地址
      address: objectall.address,
      // 备注
      remark: objectall.remark,
    }
    // var json = JSON.stringify(dataall)
    // console.log(json)
    // console.log("测试")
    this.request({
      url: 'Service/Terminal/order',
      method:"POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      params: dataall,
      callback: callback
    });
  }
  // 订单支付
  payment(oid, callback) {
    this.request({
      url: 'Service/Terminal/topay',
      params: {
        oid: oid
      },
      callback: callback
    });
  }

}
