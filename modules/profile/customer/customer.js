import util from '../../../utils/util'
import Proxy from '../../../model/proxy'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,//用户数量
    content: [],//客户数据
    team: [],//分销商
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(time.formatTime(sjc, 'Y/M/D h:m:s'));

    //---------- 获取我的客户数 ----------
    (new Proxy()).customernum(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          num: data.result
        });
      }
    });
    //---------- 获取我的客列表 ----------
    (new Proxy()).customerlist(wx.getStorageSync('key'), (data) => {
      data.result.forEach((value, index) => {
        data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D h:m');
      })

      if (data.code == 200) {
        this.setData({
          content: data.result
        });
      }
    });


  },


})