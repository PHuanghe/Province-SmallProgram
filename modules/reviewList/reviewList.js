import Team from '../../model/team'
import util from '../../utils/util'


Page({
  data: {
    list: [],
    page: 0,
    showbotton:false,
  },
  onLoad: function (options) {
    var that = this;
    //---------- 获取屏幕高度 ----------
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        });

      }
    });
    // 获取评论列表
    this.Load();
  },
  // 获取评论列表---滚动加载
  Load() {
    // 获取本地储存信息
    var comment = wx.getStorageSync("comment");
    var dataall = {
      uid: wx.getStorageSync('key'),
      gid: comment.goods_id,
      spid: comment.spec_id,
      page: this.data.page
    };
      (new Team()).getGoodsComment(dataall, (data) => {
      data.result.forEach((value, index) => {
        data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D h:m:s');
      })
      if (data.code == 200) {
        this.setData({
          list: this.data.list.concat(data.result),
          page: this.data.page + 1
        })
      } else {
        this.setData({
          showbotton: true
        });
      }

    });
  },



})
