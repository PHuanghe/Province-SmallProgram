import TopLine from '../../model/topLine'
import Goods from '../../model/goods'
import News from '../../model/news'
import Banner from '../../model/banner'
import util from '../../utils/util'

const app = getApp()

Page({
  data: {
    thumbs: [
      '../../asset/img/hotel01.jpg',
      '../../asset/img/hotel01.jpg',
      '../../asset/img/hotel01.jpg',
    ]
  },

  onLoad: function () {
    var windowHeight;
    // 产品自适应
    wx.setStorage({
      key: 'windowHeight',
      success: (res) => {
        if (res.data == wx.getStorageSync('windowHeight')) {
          // 获取系统信息
          wx.getSystemInfo({
            success: function (res) {
              // 可使用窗口宽度、高度
              windowHeight = res.windowHeight;
            },
          });
          // 本地储存数据
          wx.setStorage({
            key: "windowHeight",
            data: windowHeight,
          })
        } else {
          wx.setStorage({
            key: "windowHeight",
            data: res.data,
          })
        }
      }
    });


    //---------- 获取轮播图 ----------
    (new Banner()).list((data) => {
      if (data.code == 200) {
        this.setData({
          thumbs: [...data.result]
        });
      }
    });

    //---------- 获取头条 ----------    
    (new TopLine()).list((data) => {
      if (data.code == 200) {
        this.setData({
          msgList: [...data.result]
        });
      }
    });

    //---------- 获取商品列表 ----------    
    (new Goods()).list(0, (data) => {
      if (data.code == 200) {
        this.setData({
          commodity: data.result
        });
      }
    });

   
  },
  onShow: function (){
    //---------- 获取资讯列表 ----------
    (new News()).list(0, (data) => {
      if (data.code == 200) {
        data.result.forEach((value, index) => {
          data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D');
        })
        this.setData({
          dataall: [...data.result]
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
  article: function (data) {
    var id = data.currentTarget.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
})
