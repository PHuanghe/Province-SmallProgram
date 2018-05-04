import Order from '../../../model/order'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistics: [],
    oid: '',

    // content: [],//数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.oid = options.id;

    //加载数据
    this.allData()

  },

  allData() {
    //------------获取订单详情----------
    (new Order()).details(this.data.oid, (data) => {
      if (data.code == 200) {
        this.setData({
          content: data.result
        })
      }
    });
    //------------获取订单物流信息-------
    (new Order()).logistics(wx.getStorageSync('key'),this.data.oid, (data) => {
      if (data.code == 200) {
        this.setData({
          logistics: data.result
        })
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
  // 确认收货
  collect(e) {
    var that = this;
    console.log(e.target.dataset.oid)
    wx.showModal({
      title: '提示',
      content: '您确定收货吗？',
      success: function (res) {
        if (res.confirm) {
          (new Order()).changeOrder(wx.getStorageSync('key'), e.target.dataset.oid, (data) => {
            wx.showToast({
              title: '收货成功！',
              icon: 'success',
              duration: 1000
            })
            that.allData()
            // // 定时跳转
            // var timer = setTimeout(function () {
            //   wx.navigateBack({
            //     delta: 1
            //   })
            // }, 1500);
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 取消订单
  cancel: function (e) {
    var that = this;
    var oid = e.currentTarget.dataset.oid;//订单oid
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
              })
              // 定时跳转
              var timer = setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500);
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
            if (data.code == 200) {
              wx.showToast({
                title: '确认安装成功！',
                icon: 'success',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '确认安装失败！',
                icon: 'none',
                duration: 1000
              })
            }
            that.allData()

          })
          // 重新加载
          that.again()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      }
    })
  },


})