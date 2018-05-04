import User from '../../../model/user'
import Team from '../../../model/team'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelNum: 0,//下级商家数
    guestNum: 0,//客户数
    incomeNum: 0,//收入数
    content: [],//数据
    // 订单提示数量
    zeroNum: 0,
    oneNum: 0,
    twoNum: 0,
    threeNum: 0,
    fourNum: 0,
    isTeam: 0,// 团队
    border:false,
    promptShow:false,// 判断动态uid
    promptImg:'',//关注平台二维码

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // value为获取的本地信息
    // 将本地缓存异步取出
    var value = wx.getStorageSync('key')
    //每渲染页面时判断key，本地缓存为空时，调用wx.login
    if (!value) {

      // 调用微信弹窗接口
      wx.login({
        success: function (res) {
          var code = res.code;//微信js_code
          // 调用微信弹窗接口
          wx.showModal({
            title: '提示',
            content: '您还未授权，将无法正常使用"中福益游"的功能体验。是否再次点击授权，或者删除小程序重新进入。',
            cancelText: '否',
            confirmText: '是',
            success: function (res) {
              if (res.confirm) {
                // 用户重新同意了授权登录
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                      wx.getUserInfo({
                        success: function (res) {
                          //获取用户敏感数据密文和偏移向量
                          var rawData = res.rawData;
                          var signature = res.signature;
                          var encryptData = res.encryptData;
                          var iv = res.iv;
                          var encryptedData = res.encryptedData;
                          //---------- 提交个人资料 ----------    
                          (new User()).register(code, rawData, signature, iv, encryptedData, (data) => {
                            if (data.code == 200) {
                              //使用本地缓存
                              wx.setStorage({
                                key: 'key',
                                data: data.result
                              })
                              that.info();
                            }
                          });
                        },
                      })
                    }
                  }
                })
              }
            }
          })

        }

      });

    }
    


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
    // ----------执行方法------
    this.info()
    // 返回默认加密uid==MDAwMDAwMDAwMK52oHA
    if (wx.getStorageSync('key') == 'MDAwMDAwMDAwMK52oHA') {
      //----------获取用户----------
      (new Team()).getAnyoneQRcode((data) => {
        console.log(data)
        if (data.code == 200) {
          this.setData({
            promptImg: data.result,
          })

        };
      });
      this.setData({
        promptShow: true,
      })
    }

  },
  // 数据加载
  info() {
    //----------获取用户----------
    (new User()).userInfo(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          content: data.result,
          levelNum: data.result.sub_sep_sales,
          guestNum: data.result.sub_customer,
          incomeNum: data.result.max_income,
        })

      };
    });
    //----------获取用户订单类型数量----------
    (new User()).orderNum(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          zeroNum: data.result[0],
          oneNum: data.result[1],
          twoNum: data.result[2],
          threeNum: data.result[3],
          fourNum: data.result[4],
        })

      }else{
        this.setData({
          border:true
        })
      }
    });
  },
  // 判断是否有团队
  team: (e) => {
    var tid = e.currentTarget.dataset.tid;//团队 0，1
    if (tid == 0) {
      wx.showToast({
        title: '您还没有团队哟！',
        icon: 'none',
        duration: 2500
      })
    } else if (tid == 1) {
      wx.navigateTo({
        url: '/modules/profile/team/team',
      })
    }
  },
  // 判断是否有用户是否是团队队员
  team_son: (e) => {
    var tid = e.currentTarget.dataset.tid;//团队 0，1
    if (tid == 0) {
      wx.showToast({
        title: '您还没有团队哟！',
        icon: 'none',
        duration: 2500
      })
    } else if (tid == 1) {
      wx.navigateTo({
        url: '/modules/profile/extension/extension?title=使者推荐',
      })
    }
  },
  // 判断是否是分销商
  Prompt: (e) => {
    var id = e.currentTarget.dataset.id;//我的下级 非分销商0，分销商为1
    var tid = e.currentTarget.dataset.tid;//分销推广 非分销商0，分销商为1
    if (id == 1) {
      wx.navigateTo({
        url: '/modules/profile/subordinate/subordinate',
      })
    } else if (id == 0) {
      wx.showToast({
        title: '您还不是公益站点！',
        icon: 'none',
        duration: 2500
      })
    }

    if (tid == 1) {
      wx.navigateTo({
        url: '/modules/profile/extension/extension?title=爱心推荐',
      })
    } else if (tid == 0) {
      wx.showToast({
        title: '您还不是公益站点！',
        icon: 'none',
        duration: 2500
      })
    }
  },
  // 预览二维码
  enlarge(e){

    wx.previewImage({
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  // 关闭提示关注公众号弹窗
  close(){
    var that = this;
    that.setData({
      promptShow:false
    })

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