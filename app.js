//app.js
import User from 'model/user'


App({
  onLaunch: function () {

    wx.login({
      success: function (res) {
        var code = res.code;//微信js_code
        wx.getUserInfo({
          success: function (res) {
            //获取用户敏感数据密文和偏移向量
            var rawData = res.rawData;
            var signature = res.signature;
            var encryptData = res.encryptData;
            var iv = res.iv;
            var encryptedData = res.encryptedData; //注意是encryptedData不是encryptData;

            //---------- 提交个人资料 ----------    
            (new User()).register(code, rawData, signature, iv, encryptedData, (data) => {
              if (data.code == 200) {
                //使用本地缓存
                wx.setStorage({
                  key: 'key',
                  data: data.result
                })
              }
            });

          },
          fail: function () {
            // 调用微信弹窗接口
            wx.showModal({
              title: '警告',
              content: '您未授权该程序，将无法正常使用"中福益游"。是否授权',
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
                              }
                            });
                          },
                        })
                      }
                    }
                  })
                }else{
                 
                }
              }
            })
          }


        })

      }

    });
  },
  onShow: function (options) {
    console.log("[onShow] 场景值:", options)
  },

  onLoad: function () {

  }

})
