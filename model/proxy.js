// +----------------------------------------------------------------------
// | 广西西途比网络科技有限公司 www.c2b666.com
// +----------------------------------------------------------------------
// | 功能描述: 代理模型
// +----------------------------------------------------------------------
// | 时　　间: 2018-3-25
// +----------------------------------------------------------------------
// | 代码创建: 朱荻 <292018748@qq.com>
// +----------------------------------------------------------------------
// | 版本信息: V1.0.0
// +----------------------------------------------------------------------
// | 代码修改:（修改人 - 修改时间）
// +----------------------------------------------------------------------
import Model from '../common/model'
export default class Proxy extends Model {

  // 我的一级下级列表
  subordinate(uid, callback) {
    this.request({
      url: 'Service/Terminal/separateSales',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 我的下级，分销商下级
  separateSales(uid, callback) {
    this.request({
      url: 'Service/Terminal/separateSalesByUid',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 我的下级代理各个类型数量
  separateSalesInfo(uid, callback) {
    this.request({
      url: 'Service/Terminal/separateSalesInfo',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 类型下级列表
  alone(uid, type, callback) {
    this.request({
      url: 'Service/Terminal/getSeparateAlone',
      params: {
        uid: uid,
        type: type
      },
      callback: callback
    });
  }


  // 我的客户数
  customernum(uid, callback) {
    this.request({
      url: 'Service/Terminal/customerNum',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 我的客户列表
  customerlist(uid, callback) {
    this.request({
      url: 'Service/Terminal/customer',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 用户申请成为代理接口
  applicationAgent(uid, callback) {
    this.request({
      url: 'Service/Terminal/applicationAgent',
      params: {
        uid: uid
      },
      callback: callback
    })
  }
  // 用户申请成为代理商资讯
  teamArticle(callback) {
    this.request({
      url: 'Service/Terminal/teamArticleInfo',
      params: {
      },
      callback: callback
    })
  }


}
