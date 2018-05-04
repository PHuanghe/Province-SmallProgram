import Proxy from '../../../model/proxy'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //拨打
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '07713393339', //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
    })
  },
  // 申请
  please: function () {

    //----------获取用户订单类型数量----------
    (new Proxy()).applicationAgent(wx.getStorageSync('key'), (data) => {
      console.log(data)
      if (data.code == 200) {
        wx.showToast({
          title: data.message,
          icon: 'none',
          duration: 2500
        })

      };
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //----------获取分销商申请资讯----------
    (new Proxy()).teamArticle( (data) => {
      if (data.code == 200) {
        this.setData({
          content: JSON.parse(data.result.content)
        })
      }

    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})