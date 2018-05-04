import News from '../../model/news'
import util from '../../utils/util'


//获取应用实例
const app = getApp()

Page({
  data: {
    dataall:[],
    windowHeight:0,
    windowWidth:0,
    showdata: true,
    showbotton: true,
    pagel: 0
  },
 
  onLoad: function () {
    var windowHeight = wx.getStorageSync('windowHeight');
    this.setData({
      windowHeight: windowHeight,
    });
  },
  onShow: function () {
    this.data.dataall = [];
    this.data.pagel = 0;
    this.onrekdyl();
  },
  onrekdyl: function () {
    //---------- 获取资讯列表 ----------
    (new News()).list(this.data.pagel, (data) => {
      if (data.code == 200) {
        data.result.forEach((value, index) => {
          data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D');
        })
        this.setData({
          dataall: this.data.dataall.concat(data.result),
          showdata: false,
          pagel: this.data.pagel + 1
        });
      } else {
          this.setData({
            showbotton: false,
          });
        }
    });
  },
  lower: function () {

    // if (!this.data.showbotton) return;
    this.onrekdyl();
  },
  article: function (data) {
    var id = data.currentTarget.id;
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  },
})
