var bmap = require('./libs/bmap-wx.min.js'); 
//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    that.wxLogin()
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       that.getUserInfoOnce()
    //     } else {
    //       that.getUserInfoOnce()
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    code: null,
    encryptedData: null,
    iv: null,
    latitude: null,
    longitude: null,
    address: "中国",
    tokenId: null,
    configUrl: "https://www.funfishinghome.com"  //https://www.funfishinghome.com   
  },
  getUserInfoOnce: function () {
    var that = this
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = res.userInfo;
        that.globalData.encryptedData = res.encryptedData;
        that.globalData.iv = res.iv;
        if (that.globalData.latitude==null){
          that.getAddress();
        }else{
          that.miliLogin(that.globalData.latitude, that.globalData.longitude, that.globalData.para);
        }

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        // if (this.userInfoReadyCallback) {
        //   this.userInfoReadyCallback(res)
        // }
      },
      fail: res => {
        that.getUserInfoAgain()
      }
    })
  },
  getUserInfoAgain: function () {
    var that = this
    wx.showModal({
      title: "提示",
      content: "请允许微信授权，否则小程序无法正常使用",
      showCancel: false,
      success: res => {
        wx.openSetting({
          success: res => {
            that.getUserInfoOnce()
          }
        })
      }
    })
  },
  getAddress: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.globalData.latitude = res.latitude
        that.globalData.longitude = res.longitude
        that.miliLogin(res.latitude, res.longitude)
        that.map()
      },
      fail: function (res) {
        that.getAddressAgain()
      }
    })
  },
  getAddressAgain: function () {
    var that = this
    wx.showModal({
      title: "提示",
      content: "请允许获取地理位置，否则小程序无法正常使用",
      showCancel: false,
      success: res => {
        wx.openSetting({
          success: res => {
            that.getAddress()
          }
        })
      }
    })
  },
  map: function () {
    var that = this
    var BMap = new bmap.BMapWX({
      ak: "uaHL071TvyX4fzUKAj3WmDAZZCZywU9I"
    });
    var success = function (data) {
      that.globalData.address = data.originalData.result.formatted_address
    };
    var fail = function (data) {
   
    }
    BMap.regeocoding({
      success: success,
      fail: fail
    });
  },
  http: function (options) {
    var that = this, json;
    that.globalData.para = options;
    if (!that.globalData.tokenId){
      json = options.data
    } else if (options.data){
      json = Object.assign(options.data, {
        tokenId: that.globalData.tokenId
      })
    }else {
      json = { tokenId: that.globalData.tokenId}
    }
    wx.request({
      url: that.globalData.configUrl + options.url,
      method: options.method,
      data: json,
      header: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      success: res => {
        if (res.data.status==-1000){
          wx.showLoading({
            title: '正在重新登录',
          })
          that.wxLogin();
          return;
        }
        if (res.data.status!=1){
          that.errorToast(res.data.msg)
          return false;
        }
        options.success(res.data)
      },
      fail: res => {
        if (options.fail){
          options.fail(res)
        }
      },
      complete:res=>{
        if (options.complete) {
          options.complete(res)
        }
      }
    })
  },
  wxLogin:function(){
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.code = res.code;
        that.getUserInfoOnce();
      }
    })
  },
  miliLogin:function(lat,lon,para){
    var that = this;
    that.http({
      url: "/app/web/miniLogin",
      method: "POST",
      data: {
        code: that.globalData.code,
        iv: that.globalData.iv,
        encryptedData: that.globalData.encryptedData,
        lat: lat,
        lon: lon
      },
      success: res => {
        if (res.status != 1) {
          wx.showToast({
            title: res.msg,
          })
          return;
        }
        that.globalData.tokenId = res.data.tokenId;
        if (para){
          that.http(para);
          that.globalData.para = null;
          wx.hideLoading();
        }
      }
    })
  },
  //分享信息
  // shareInfo:{
  //   title: '钓鱼人的钓鱼神器，关注领红包',
  //   imageUrl:'/images/share.jpg'
  // },
  //错误提示
  errorToast:function(msg){
    wx.showToast({
      title: msg,
      image:'/images/ts-icon.png'
    })
  }
})