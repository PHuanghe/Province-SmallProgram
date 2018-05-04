import User from '../../../model/user'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    change1: true,//游币
    change2: true,//金额
    swimNum: '',//游币数量
    allSwim: 0,//全部游币
    moneyNum: '',//金额数量
    allMoney: 0,//全部金额
    exceed1: true,//监听游币
    exceed2: true,//监听金额

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
    if (options.title == "兑换游币") {
      that.setData({
        change1: true,//options为页面路由过程中传递的参数
        change2: false,
      })
    } else if (options.title == "余额提现") {
      that.setData({
        change1: false,
        change2: true,//options为页面路由过程中传递的参数
      })
    }

  },
  // 全部兑换游币替换
  wholeSwim() {
    var _this = this;
    _this.setData({
      swimNum: _this.data.allSwim
    })
  },
  // 监听游币输入
  watchSwim: function (event) {
    var _this = this;
    _this.setData({
      swimNum: event.detail.value
    })
    if (parseInt(event.detail.value) >= _this.data.allSwim + 1) {
      _this.setData({
        exceed1: false,
      })
    } else if (parseInt(event.detail.value) <= _this.data.allSwim - 1) {
      _this.setData({
        exceed1: true,
      })
    }
  },


  // 全部金额替换
  wholeMoney() {
    var _this = this;
    _this.setData({
      moneyNum: _this.data.allMoney
    })
  },
  // 监听金额输入
  watchMoney: function (event) {
    var _this = this;
    _this.setData({
      moneyNum: event.detail.value
    })
    if (parseInt(event.detail.value) >= _this.data.allMoney + 1) {
      _this.setData({
        exceed2: false,
      })
    } else if (parseInt(event.detail.value) <= _this.data.allMoney - 1) {
      _this.setData({
        exceed2: true,
      })
    }
  },

  // 兑换申请
  swim: function () {
    var _this = this;
    // 判断输入的是否为大于可兑换数量
    if (_this.data.swimNum >= _this.data.allSwim + 1) {
      wx.showToast({
        title: '输入不能大于可兑换数量哦',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    // 判断输入的是否为正整数
    if (!/^[0-9]*[1-9][0-9]*$/.test(_this.data.swimNum)) {
      wx.showToast({
        title: '输入只能是正整数并且不能等于0哦',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    //----------------游币兑换接口-------------
    (new User()).convertTm(wx.getStorageSync('key'), _this.data.swimNum, (data) => {
      if (data.code == 200) {
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '兑换失败！',
          icon: 'none',
          duration: 1000
        })
      }
      // 定时跳转
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1500);

    });

  },

  // 提现申请
  money: function () {
    var _this = this;
    // 判断输入的是否为大于可兑换数量
    if (_this.data.moneyNum >= _this.data.allMoney + 1) {
      wx.showToast({
        title: '输入不能大于可提现金额哦',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    // 判断输入的是否为正整数
    if (!/^[0-9]*[1-9][0-9]*$/.test(_this.data.moneyNum)) {
      wx.showToast({
        title: '输入只能是正整数并且不能等于0哦',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    //----------------金额提现接口-------------
    (new User()).cashApply(wx.getStorageSync('key'), parseInt(_this.data.moneyNum), (data) => {
      if (data.code == 200) {
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '提现申请失败！',
          icon: 'none',
          duration: 1000
        })
      }
      // 定时跳转
      var timer = setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1500);
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
    //----------获取我的钱包资产数据----------
    (new User()).assets(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        //游币
        if (data.result.userTm==''){
          this.setData({
            allSwim: 0,

          })
        }else{
          this.setData({
            allSwim: parseInt(data.result.userTm),
          })
        }
        //金额
        if (data.result.amount == '') {
          this.setData({
            allMoney: 0,
          })
        } else {
          this.setData({
            allMoney: parseInt(data.result.amount),
          })
        }
        
        
      };
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