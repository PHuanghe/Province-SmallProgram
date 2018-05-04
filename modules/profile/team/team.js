import Team from '../../../model/team'


Page({
  data: {
    info: [],//我的团队信息
    content: [],//我的团队列表
    member_num: 0,
    dev_num: 0,
    need_num: 0,
    is_captain: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  onShow: function () {
    this.showData();
  },
  showData() {
    //---------- 判断是否是队长 ----------
    (new Team()).captain(wx.getStorageSync('key'), (data) => {
      console.log(data)
      if (data.code == 200) {
        this.setData({
          is_captain: 1
        });
      }
    });
    //---------- 获取我的团队列表 ----------
    (new Team()).teams(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          content: [...data.result]
        });
      }
    });
    //---------- 获取我的团队信息 ----------
    (new Team()).teamInfo(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          info: data.result,
          member_num: data.result.member_num,
          dev_num: data.result.dev_num,
          need_num: data.result.need_num,
        });
      }
    });

  },

  // 同意入队
  agree(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;//对应用户uid
    //---------- 同意入队 ----------
    (new Team()).agree(wx.getStorageSync('key'), id, (data) => {
      console.log(data)
      wx.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000
      })
      that.showData();
    });
  },
  // 移除队员
  remove(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;//对应用户uid
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '您正在移除该队员？',
      success: function (res) {
        if (res.confirm) {
          //---------- 移除队员 ----------
          (new Team()).remove(wx.getStorageSync('key'), id, (data) => {
            console.log(data)
            wx.showToast({
              title: data.message,
              icon: 'none',
              duration: 2000
            })
            that.showData();
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  // 拒绝入队
  refuse(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;//对应用户uid
    //---------- 拒绝入队 ----------
    (new Team()).refuse(wx.getStorageSync('key'), id, (data) => {
      console.log(data)
      wx.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000
      })
      that.showData();
    });
  }


})