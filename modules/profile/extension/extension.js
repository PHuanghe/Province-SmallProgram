import Team from '../../../model/team'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',//分销商二维码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 动态替换页面标题为路由参数
    wx.setNavigationBarTitle({
      title: options.title
    })
    var that = this;
    if (options.title == "爱心推荐") {
      //---------------爱心推荐------------------
      (new Team()).qrCode(wx.getStorageSync('key'),3, (data) => {
        if (data.code == 200) {
          this.setData({
            url: data.result
          });
        }
      });

    } else if (options.title == "使者推荐") {
      //---------------使者推荐------------------
      (new Team()).qrCode(wx.getStorageSync('key'),2, (data) => {
        if (data.code == 200) {
          this.setData({
            url: data.result
          });
        }
      });
    }


  },

  // 预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接   
      urls: [e.currentTarget.dataset.img]
    })
  },


})
