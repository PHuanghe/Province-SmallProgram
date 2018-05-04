import util from '../../../utils/util'
import User from '../../../model/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["游币记录", "兑换记录", "奖励金记录", "提现记录"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    onePage: 0,
    twoPage: 0,
    threePage: 0,
    fourPage: 0,
    tmRecord: [],//游币记录

    commission: [],//兑换记录

    rewardPrice: [],//奖励金记录

    withdraw: [],//提现记录



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 滚动区域大小
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          height: res.windowHeight-216
        })
      }
    });
    


  },
  // 点击切换目录
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
  // 游币记录滚动加载
  tmRecordLoad() {
    //----------获取我的钱包游币数据-----------------
    (new User()).tmRecord(wx.getStorageSync('key'), this.data.onePage, (data) => {
      data.result.forEach((value, index) => {
        data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D h:m:s')
      })
      if (data.code == 200) {
        this.setData({
          tmRecord: this.data.tmRecord.concat(data.result),
          onePage: this.data.onePage + 1
        })

      } else {
        this.setData({
          showbotton: true
        })
      }
    });

  },
  // 兑换记录滚动加载
  commissionLoad() {
    //----------获取我的钱包兑换记录数据----------
    (new User()).commissionCash(wx.getStorageSync('key'), this.data.twoPage, (data) => {

      data.result.forEach((value, index) => {
        data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D h:m:s');
      })
      if (data.code == 200) {
        this.setData({
          commission: this.data.commission.concat(data.result),
          twoPage: this.data.twoPage + 1
        })
      } else {
        this.setData({
          showbotton: true
        })
      }
    });
  },
  // 奖励金记录滚动加载
  rewardLoad() {
    //----------获取我的钱包奖励金记录数据----------
    (new User()).rewardPrice(wx.getStorageSync('key'), this.data.threePage, (data) => {
      data.result.forEach((value, index) => {
        data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D h:m:s')
      })
      if (data.code == 200) {
        this.setData({
          rewardPrice: this.data.rewardPrice.concat(data.result),
          threePage: this.data.threePage + 1
        })
      } else {
        this.setData({
          showbotton: true
        })
      }
    });
  },
  // 提现记录滚动加载
  withdrawLoad() {
    //----------获取我的钱包提现记录数据----------
    (new User()).withdraw(wx.getStorageSync('key'), this.data.fourPage, (data) => {
      data.result.forEach((value, index) => {
        data.result[index].create_time = util.formatTime(value.create_time, 'Y-M-D h:m:s')
      })
      if (data.code == 200) {
        this.setData({
          withdraw: this.data.withdraw.concat(data.result),
          fourPage: this.data.fourPage + 1
        })
      } else {
        this.setData({
          showbotton: true
        })
      }
    });
  },


  // 兑换
  exchange() {
    wx.navigateTo({
      url: '/modules/profile/exchange/exchange?title=兑换游币'　　// 页面 A
    })
  },
  // 提现
  carry() {
    wx.navigateTo({
      url: '/modules/profile/exchange/exchange?title=余额提现'　　// 页面 A
    })
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
    //----------获取我的钱包资产数据----------
    (new User()).assets(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          assets: data.result,
        })
      };
    });

    //----------获取我的钱包游币数据-----------------
    this.tmRecordLoad();
    //----------获取我的钱包兑换游币记录数据----------
    this.commissionLoad();
    //----------获取我的钱包奖励金记录数据------------
    this.rewardLoad();
    //----------获取我的钱包提现记录数据--------------
    this.withdrawLoad();
    //----------第一次加载完成后把page清为1-----------
    // this.setData({
    //   page: 1
    // });

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