import Goods from '../../model/goods'
//获取应用实例
const app = getApp()
Page({
  data: {
    windowHeight: 0,
    windowWidth: 0,
    judgeshow: ''
  },
  onLoad: function () {
    var windowHeight = wx.getStorageSync('windowHeight');
    this.setData({
      windowHeight: windowHeight
    });
    
    //---------- 获取商品列表 ---------- 
    (new Goods()).shoppingmall(0, (data) => {
      if (data.code == 200) {
        this.setData({
          carousel: data.result
        });
      }
    });
  },
  shopping: function (data) {
    var id = data.currentTarget.id;
    wx.navigateTo({
      url: '../productDetails/productDetails?id=' + id,
    })
  },
})
