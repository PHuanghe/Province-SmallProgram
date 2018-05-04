import Model from '../common/model'
export default class User extends Model {

  // 获取用户
  userInfo(uid, callback) {
    this.request({
      url: "Service/Terminal/userInfo",
      params: {
        uid: uid
      },
      callback: callback
    });

  }
  // 个人信息提交接口
  register(code, rawData, signature, iv, encryptedData, callback) {
    this.request({
      url: 'Service/Terminal/login',
      params: {
        "code": code,
        "rawData": rawData,
        "signature": signature,
        'iv': iv,
        'encryptedData': encryptedData
      },
      callback: callback
    });
  }
  // 获取各个类型订单提示数量
  orderNum(uid, callback) {
    this.request({
      url: "Service/Terminal/getOrderNum",
      params: {
        uid: uid
      },
      callback: callback
    });
  }

  // 获取我的钱包资产数据
  assets(uid, callback) {
    this.request({
      url: 'Service/Terminal/getAsset',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 获取我的钱包游币记录数据
  tmRecord(uid, page, callback) {
    this.request({
      url: 'Service/Terminal/userTmRecord',
      params: {
        uid: uid,
        page: page
      },
      callback: callback
    });
  }
  // 获取我的钱包游币兑换记录数据
  commissionCash(uid, page, callback) {
    this.request({
      url: 'Service/Terminal/userCommissionCash',
      params: {
        uid: uid,
        page: page
      },
      callback: callback
    });
  }
  // 获取我的钱包奖励金记录数据
  rewardPrice(uid, page, callback) {
    this.request({
      url: 'Service/Terminal/userRewardPrice',
      params: {
        uid: uid,
        page: page
      },
      callback: callback
    });
  }
  // 获取我的钱包提现记录数据
  withdraw(uid, page, callback) {
    this.request({
      url: 'Service/Terminal/userWithdraw',
      params: {
        uid: uid,
        page: page
      },
      callback: callback
    });
  }
  // 我的钱包金额提现接口
  cashApply(uid, number, callback) {
    this.request({
      url: 'Service/Terminal/cashApply',
      params: {
        uid: uid,
        number: number
      },
      callback: callback
    });
  }
  // 我的钱包游币兑换接口
  convertTm(uid, number, callback) {
    this.request({
      url: 'Service/Terminal/convertTm',
      params: {
        uid: uid,
        number: number
      },
      callback: callback
    });
  }
  // 分销体系列表
  saleInform(page, callback) {
    this.request({
      url: 'Service/Terminal/saleInformation',
      params: {
        page: page,
        
      },
      callback: callback
    });
  }
  // 分销体系详情
  articleDetails(id, callback) {
    this.request({
      url: 'Service/Terminal/saleInformationDetails',
      params: {
        id: id,

      },
      callback: callback
    });
  }


}
