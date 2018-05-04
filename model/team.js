// +----------------------------------------------------------------------
// | 广西西途比网络科技有限公司 www.c2b666.com
// +----------------------------------------------------------------------
// | 功能描述: 团队模型
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
export default class Team extends Model {

  // 我的团队信息
  teamInfo(uid, callback) {
    this.request({
      url: 'Service/Terminal/teamInfo',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 我的团队列表
  teams(uid, callback) {
    this.request({
      url: 'Service/Terminal/teamAndMember',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 我的团队-判断是否是队长
  captain(uid, callback) {
    this.request({
      url: 'Service/Terminal/is_captain',
      params: {
        uid: uid
      },
      callback: callback
    });
  }
  // 我的团队-移除队员
  remove(uid, id, callback) {
    this.request({
      url: 'Service/Terminal/removeTeamMember',
      params: {
        uid: uid,
        id: id
      },
      callback: callback
    });
  }
  // 我的团队-同意加入团队
  agree(uid, id, callback) {
    this.request({
      url: 'Service/Terminal/agreeTeamMember',
      params: {
        uid: uid,
        id: id
      },
      callback: callback
    });
  }
  // 我的团队-拒绝加入团队
  refuse(uid, id, callback) {
    this.request({
      url: 'Service/Terminal/notAgreeTeamMember',
      params: {
        uid: uid,
        id: id
      },
      callback: callback
    });
  }

  // 获取团队加入二维码，
  // 队长邀请入队 type=1
  // 队员邀请 type=2
  // 分销推广 type=3
  qrCode(uid, type, callback) {
    this.request({
      url: 'Service/Terminal/getQRcode',
      params: {
        uid: uid,
        type: type
      },
      callback: callback
    });
  }
  // 生成关注平台二维码
  getAnyoneQRcode(callback) {
    this.request({
      url: 'Service/Terminal/getAnyoneQRcode',
      params: {
      },
      callback: callback
    });
  }

  // 提交商品评论
  setGoodsComment(uid, oid, good_id, spec_id, content, picture, callback) {
    this.request({
      url: 'Service/Terminal/setGoodsComment',
      params: {
        uid: uid,
        oid: oid,
        good_id: good_id,
        spec_id: spec_id,
        content: content,
        picture: picture,
      },
      callback: callback
    });
  }
  // 商品评论列表
  getGoodsComment(data, callback) {

    this.request({
      url: 'Service/Terminal/getGoodsComment',
      params: {
        uid: data.uid,
        gid: data.gid,
        spid: data.spid,
        page: data.page
      },
      callback: callback
    });
  }


}
