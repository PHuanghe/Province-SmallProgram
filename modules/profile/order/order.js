import Order from '../../../model/order'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,//类型切换
    tabs: ["全部", "待确认", "待付款", "待收货", "待安装", "待评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    content: [],//全部订单数据
    page: 0,
    sonContent: [],//单个类型订单
    activekey: 1,
    sonPage: 0,
    showbotton: true,
    allshow:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //---------- 获取屏幕高度 ----------
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight - 50
        });

      }
    });
    //---------- 获取全部订单列表 ----------
    this.bindDownLoad()
    //------------------------------------

    // 获取跳转id类型
    this.data.activeIndex = parseInt(options.id) + 1;
    this.setData({
      activeIndex: parseInt(options.id) + 1,
    });

    //---------- 获取类型订单列表 ----------
    (new Order()).listType(wx.getStorageSync('key'), options.id, this.data.sonPage, (data) => {
      if (data.code == 200) {
        this.setData({
          sonContent: that.data.sonContent.concat(data.result),
          showbotton: false,
          sonPage: this.data.sonPage + 1
        });
      } else {
        this.setData({
          showbotton: true
        });
      }
    });
    //--------------------------------------

  },
  // 点击类型切换获取数据
  tabClick: function (e) {
    this.data.activekey = e.currentTarget.id,
      this.data.sonPage = 0,
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: this.data.activekey
      });
    // 单个状态status订单
    (new Order()).listType(wx.getStorageSync('key'), this.data.activekey - 1, 0, (data) => {
      if (data.code == 200) {
        this.setData({
          sonContent: data.result,
          showbotton: false,
          sonPage: this.data.sonPage + 1
        });
      } else {
        this.setData({
          showbotton: true
        });
      }
    });
  },
  // 去付款
  payment: function (e) {
    wx.request({
      url: 'http://www.sydltds.com/Service/Terminal/topay',//改成你自己的链接 
      header: "Content-Type': 'application/x-www-form-urlencoded",
      method: 'POST',
      success: function (res) {
        console.log(res.data.result);
        console.log('调起支付');
        console.log(res);
        wx.requestPayment({
          'timeStamp': res.data.result.timeStamp,
          'nonceStr': res.data.result.nonceStr,
          'package': res.data.result.package,
          'signType': 'MD5',
          'paySign': res.data.result.paySign,
          success: function (res) {
            console.log('success');
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log('complete');
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    });
  },
  // 重新加载状态接口数据
  again() {
    var that = this;
    // 定时重新加载
    var timer = setTimeout(function () {
      // 单个状态status订单
      (new Order()).listType(wx.getStorageSync('key'), that.data.activeIndex - 1, 0, (data) => {
        if (data.code == 200) {
          that.setData({
            sonContent: data.result,
            showbotton: false,
            sonPage: 0
          });
        } else {
          that.setData({
            sonContent: '',
            showbotton: true
          });
        }
      });
    }, 1500);
  },

  // 确认收货
  collect(e) {
    var that = this;
    var oid = e.currentTarget.dataset.oid;//订单oid
    wx.showModal({
      title: '提示',
      content: '您确定收货吗？',
      success: function (res) {
        if (res.confirm) {
          (new Order()).changeOrder(wx.getStorageSync('key'), oid, (data) => {
            if(data.code==200){
              wx.showToast({
                title: '确认收货成功！',
                icon: 'success',
                duration: 1000
              })
            }else{
              wx.showToast({
                title: '确认收货失败！',
                icon: 'none',
                duration: 1000
              })
            }
           
          });
          // 重新加载
          that.again()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 确认安装
  install(e) {
    var that = this;
    var oid = e.currentTarget.dataset.oid;//订单oid
    wx.showModal({
      title: '提示',
      content: '您确认已经安装吗？',
      success: function (res) {
        if (res.confirm) {
          (new Order()).completed(wx.getStorageSync('key'), oid, (data) => {
            if(data.code==200){
              wx.showToast({
                title: '确认安装成功！',
                icon: 'success',
                duration: 1000
              })
            }else{
              wx.showToast({
                title: '确认安装失败！',
                icon: 'none',
                duration: 1000
              })
            }

          })
          // 重新加载
          that.again()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      }
    })
  },

  // 取消订单
  cancel: function (e) {
    var that = this;
    var oid = e.currentTarget.dataset.id;//订单oid
    wx.showModal({
      title: '提示',
      content: '您确定取消该订单吗？',
      success: function (res) {
        if (res.confirm) {
          //---------- 取消订单 ----------
          (new Order()).cancelOrder(wx.getStorageSync('key'), oid, function (data) {
            if (data.code == 200) {
              wx.showToast({
                title: '取消成功！',
                icon: 'success',
                duration: 1500
              });
              //--------全部订单----------
              (new Order()).list(wx.getStorageSync('key'), 0, (data) => {
                if (data.code == 200) {
                  that.setData({
                    content: data.result,
                    allshow: false,
                  });
                } else {
                  that.setData({
                    allshow: true
                  })
                }
              });
              // 单个状态status订单
              (new Order()).listType(wx.getStorageSync('key'), that.data.activeIndex - 1, 0, (data) => {
                if (data.code == 200) {
                  that.setData({
                    sonContent: data.result,
                    showbotton: false,
                  });
                } else {
                  that.setData({
                    showbotton: true
                  });
                }
              });

            } else {
              wx.showToast({
                title: '取消失败！',
                icon: 'none',
                duration: 1500
              })
            }
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 全部订单的页面滑动到底部时加载
  bindDownLoad() {

    (new Order()).list(wx.getStorageSync('key'), this.data.page, (data) => {
      if (data.code == 200) {
        this.setData({
          content: this.data.content.concat(data.result),
          allshow: false,
          page: this.data.page + 1,
        });
      } else {
        this.setData({
          allshow: true
        })
      }
    });

  },

  // 类型状态订单的页面滑动到底部时加载
  sonLoad() {

    //---------- 获取类型订单列表 ----------
    (new Order()).listType(wx.getStorageSync('key'), this.data.activekey - 1, this.data.sonPage, (data) => {
      if (data.code == 200) {
        this.setData({
          sonContent: this.data.sonContent.concat(data.result),
          showbotton: false,
          sonPage: this.data.sonPage + 1
        });
      } else {
        this.setData({
          showbotton: true
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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